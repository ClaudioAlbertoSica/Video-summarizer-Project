import 'dart:convert';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_pdfview/flutter_pdfview.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
//COMENTO PORQUE AHORA NO USAMOS EL PROVIDER
//import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';


class ResumenDetailScreen extends ConsumerWidget {
  ResumenDetailScreen({super.key, required this.resumen, required this.pdfBytes,});
  static const String name = 'ResumenDetailScreen';
  final ResumenPreview resumen;
  final Uint8List pdfBytes;
  String errorMessage = '';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //COMENTO PORQUE AHORA NO LO USAMOS
    //final idUser = ref.watch(userProvider.notifier).state;
    final screenHeight = MediaQuery.of(context).size.height;
    final idUser = ref.watch(userNotifierProvider).id;
    final idRes = resumen.idres;

    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(resumen.title,
                    style: GoogleFonts.ubuntu(
                      fontSize: 24,
                      fontWeight: FontWeight.w700
                    ),
                  ),
                  const Divider(),
                  const SizedBox(height: 100),
                  RatingBar.builder(
                    initialRating: 3,
                    minRating: 1,
                    direction: Axis.horizontal,
                    allowHalfRating: true,
                    itemCount: 5,
                    itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
                    itemBuilder: (context, _) => const Icon(
                      Icons.star,
                      color: Colors.amber,
                    ),
                    onRatingUpdate: (rating) {
                      print(rating);
                    },
                  ),
                  Text(
                      resumen.title,
                      style: GoogleFonts.ubuntu(
                        fontWeight: FontWeight.w700,
                      )
                    ),
                  ElevatedButton(
                    onPressed: ()async{
                      await completeResumen(idUser, idRes, context);
                    }, 
                    child: Text("Ver PDF"),
                  ),
                ],
              ),
            ],
          ),
      ),
    );
  }

  Future<void> completeResumen(String idUser, String idRes, BuildContext context) async {
    try {
      final url = Uri.parse('http://10.0.2.2:8080/api/$idUser/resumen/$idRes');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        // Desestructura el JSON para obtener el campo "data"
        final jsonData = json.decode(response.body);
        final pdfData = jsonData['pdf']['data'];

        // Decodifica los datos base64 del PDF
        final pdfBytes = base64Decode(pdfData);

        // Muestra el documento PDF en un Scaffold
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => Scaffold(
            appBar: AppBar(title: Text('PDF Viewer')),
            body: PDFView(
              pdfData: Uint8List.fromList(pdfBytes),
              pageSnap: false,
              pageFling: false,
            ),
          ),
        ));
        //context.pushNamed(ResumenDetailScreen.name, extra: {'resumen': resumen, 'pdfBytes': pdfBytes});

      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
  }
}
