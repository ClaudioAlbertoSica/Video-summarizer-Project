import 'dart:convert';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class ResumenDetailScreen extends ConsumerWidget {
  ResumenDetailScreen({
    super.key,
    required this.resumen,
    required this.pdfBytes,
  });

  static const String name = 'ResumenDetailScreen';
  final ResumenPreview resumen;
  final Uint8List pdfBytes;
  String errorMessage = '';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final idUser = ref.watch(userNotifierProvider).id;
    final idRes = resumen.idres;
    final isDark = ref.watch(userNotifierProvider).isDark;
    final screenHeight = MediaQuery.of(context).size.height;
    
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
      ),
      body: SingleChildScrollView(
        child: StackLayoutCustomized(
          screenHeight: screenHeight,
          colorLight: const Color.fromRGBO(235, 240, 241, 1), 
          colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
          imageLigth:'onlyBackgroundWithLogo.png',
          imageDark:'onlyBackgroundWithLogoD.png',
          content: [
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 40,),
                  SizedBox(
                    width: double.infinity,
                    height: 200,
                    child: InkWell(
                      onTap: () async {
                        await completeResumen(idUser, idRes, context);
                      },
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: getImage(isDark),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(resumen.title, style: GoogleFonts.ubuntu(fontSize: 24, fontWeight: FontWeight.w700)),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      RatingBar.builder(
                        initialRating: 3,
                        minRating: 1,
                        direction: Axis.horizontal,
                        allowHalfRating: true,
                        itemCount: 5,
                        itemSize: 20,
                        itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
                        itemBuilder: (context, _) => const Icon(
                          Icons.star,
                          color: Colors.amber,
                        ),
                        onRatingUpdate: (rating) {
                          print(rating);
                        },
                      ),
                      Row(
                        children: [
                          IconButton(
                            icon: Icon(Icons.favorite, color: resumen.isFavourite ? Colors.red : Colors.grey),
                            onPressed: () {
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.download, color: Colors.blue),
                            onPressed: () {
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete, color: Colors.red),
                            onPressed: () {
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ]
        ),
      )
    );
  }

  Image getImage(isDark) {
    if (resumen.thumbnail != null) {
      try {
        Uint8List bytes = Uint8List.fromList(resumen.thumbnail!.codeUnits);

        return Image.memory(
          bytes,
          width: double.infinity,
          height: double.infinity,
          fit: BoxFit.cover,
        );
      } catch (e) {
        return Image.asset(
          isDark ? 'assets/images/errorThumbnailD.jpeg' : 'assets/images/errorThumbnail.jpeg',
          width: double.infinity,
          height: double.infinity,
          fit: BoxFit.cover,
        );
      }
    }
    return Image.asset(
      'assets/images/thumball.jpeg',
      width: double.infinity,
      height: double.infinity,
      fit: BoxFit.cover,
    );
  }

  Future<void> completeResumen(String idUser, String idRes, BuildContext context) async {
    try {
      final url = Uri.parse('http://localhost:8080/api/$idUser/resumen/$idRes');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        final pdfData = jsonData['pdf']['data'];
        final pdfBytes = base64Decode(pdfData);

        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => Scaffold(
            appBar: AppBar(title: Text('PDF Viewer')),
            body: SfPdfViewer.memory(Uint8List.fromList(pdfBytes)),
          ),
        ));
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }
}
