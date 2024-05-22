import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:url_launcher/url_launcher.dart';

class ResumenDetailScreen extends ConsumerWidget {
  ResumenDetailScreen({
    super.key,
    required this.idUser,
    required this.resumen,

  });

  static const String name = 'ResumenDetailScreen';
  final String idUser;
  final ResumenPreview resumen;
  String url = '';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
                Text(
                  resumen.title,
                  style: GoogleFonts.ubuntu(
                    fontSize: 24,
                    fontWeight: FontWeight.w700,
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
                  ),
                ),
                ElevatedButton(
                  onPressed: _openPDF,
                  child: const Text('Open PDF'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openPDF() async {
    url = 'http://localhost:8080/api/$idUser/pdf/${resumen.idres}'; // Cambia a tu URL real
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
