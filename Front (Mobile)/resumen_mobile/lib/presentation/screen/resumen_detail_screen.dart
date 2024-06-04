import 'dart:typed_data';
import 'package:go_router/go_router.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import '../uicoreStyles/uicore_our_app_bar.dart';

class ResumenDetailScreen extends ConsumerStatefulWidget {
  ResumenDetailScreen({
    Key? key,
    required this.resumen,
    required this.pdfBytes,
  }) : super(key: key);

  static const String name = 'ResumenDetailScreen';
  final ResumenPreview resumen;
  final Uint8List pdfBytes;
  @override
  _ResumenDetailScreenState createState() => _ResumenDetailScreenState();
}

class _ResumenDetailScreenState extends ConsumerState<ResumenDetailScreen> {
  String errorMessage = '';
  int? idResImage;

  @override
  Widget build(BuildContext context) {
    final idUser = ref.watch(userNotifierProvider).id;
    final idRes = widget.resumen.idres;
    idResImage = (int.parse(idRes) - 1 ) % 10 + 1;
    final isDark = ref.watch(userNotifierProvider).isDark;
    final screenHeight = MediaQuery.of(context).size.height;
    final resumen = widget.resumen;
    final isFavourite = ref.watch(userNotifierProvider).getResumen(idRes).isFavourite;


  return Scaffold(
    extendBodyBehindAppBar: true,
    appBar: OurAppBar(),
    body: StackLayoutCustomized(
        keyboardHeight: MediaQuery.of(context).viewInsets.bottom,
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
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      width: 2,
                      color: const Color.fromARGB(255, 244, 130, 42),
                    ),
                  ),
                  width: double.infinity,
                  height: 200,
                  child: InkWell(
                    onTap: () async {
                      await Server.mostrarPDF(context, widget.pdfBytes);
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
                      initialRating: resumen.points * 1.0,
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
                      onRatingUpdate: (rating) async {
                        await Server.actualizarResumenPoints(idUser, idRes, rating, ref);
                        setState(() {});
                      },
                    ),
                    Row(
                      children: [
                        IconButton(
                          icon: Icon(Icons.favorite, color: isFavourite ? Colors.red : Colors.grey),
                          onPressed: () async {
                            await Server.putLikeResume(idUser, idRes, ref);
                            await Server.actualizarUsuario(idUser, ref);
                            setState(() {});
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.mail, color: Colors.blue),
                          onPressed: () async {
                            bool sendOk = await Server.enviarResumen(idUser, idRes);
                            if (sendOk) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: const Text('Resumen enviado.'),
                                  backgroundColor: Colors.green[700],
                                ),
                              );
                            }
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () async {
                            bool confirmarBorrado = await showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: Text("Estas por borrar ${resumen.title}"),
                                  content: const Text("¿Estás seguro que deseas borrarlo?"),
                                  actions: [
                                    ElevatedButton(onPressed: ()=> Navigator.of(context).pop(false), child: const Text("Cancelar")),
                                    ElevatedButton(onPressed:()=> Navigator.of(context).pop(true), child: const Text("Borrar"))
                                  ],
                                );
                              }
                            );
                            if (confirmarBorrado) {
                              await Server.borrarResumen(idUser, idRes);
                              await Server.actualizarUsuario(idUser, ref);
                              context.goNamed(LoadingScreen.name, extra: 'Resumen Eliminado! Redirigiendo al Home...');
                            }
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
  );
}

  Image getImage(isDark) {
    if (widget.resumen.thumbnail != null) {
      try {
        return Image.network(
          widget.resumen.thumbnail!,
          width: double.infinity,
          height: double.infinity,
          fit: BoxFit.cover,
          errorBuilder: (BuildContext context, Object exception, StackTrace? stackTrace) {
            // Mostrar una imagen de error si falla la carga
            return Image.asset(
              isDark ? 'assets/images/errorThumbnailD.gif' : 'assets/images/errorThumbnail.gif',
              width: double.infinity,
              height: double.infinity,
              fit: BoxFit.cover,
            );
          },
        );
      } catch (e) {
        return Image.asset(
          isDark ? 'assets/images/errorThumbnailD.gif' : 'assets/images/errorThumbnail.gif',
          width: double.infinity,
          height: double.infinity,
          fit: BoxFit.cover,
        );
      }
    }
    return Image.asset(
      'assets/images/$idResImage.png',
      width: double.infinity,
      height: double.infinity,
      fit: BoxFit.cover,
    );
  }


}
