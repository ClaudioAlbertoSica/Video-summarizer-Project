import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/entity/user.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

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

    Future<void> actualizarUsuario(String idUser) async {
    try {
      final url = Uri.parse('http://localhost:8080/api/$idUser');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        final rsp = json.decode(response.body);

        User userActualizado = User(
            userName: rsp['userName'],
            id: rsp['id'],
            inventario: (rsp['inventario'] as List)
              .map((item) => ResumenPreview.fromJson(item))
              .toList(), 
            inProgress: rsp['inProgress'],
            isDark: rsp['config']['isDark'],
            provisoria: rsp['provisoria'],
          );

          ref.read(resumenNotifierProvider.notifier).changeList(userActualizado.inventario);
          ref.read(userNotifierProvider.notifier).setUserLogin(userActualizado);
      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
  }

  return Scaffold(
    extendBodyBehindAppBar: true,
    appBar: OurAppBar(),
    body: StackLayoutCustomized(
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
                      color: Color.fromARGB(255, 244, 130, 42),
                    ),
                  ),
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
                        await actualizarResumenPoints(idUser, idRes, rating, ref);
                      },
                    ),
                    Row(
                      children: [
                        IconButton(
                          icon: Icon(Icons.favorite, color: isFavourite ? Colors.red : Colors.grey),
                          onPressed: () async {
                            await putLikeResume(idUser, idRes, ref);
                            setState(() {});
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.download, color: Colors.blue),
                          onPressed: () async {
                            await downloadResumen(idUser, idRes);
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
                              await borrarResumen(idUser, idRes);
                              await actualizarUsuario(idUser);
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

Future<void> downloadResumen(String idUser, String idRes) async {
try {
      final url = Uri.parse('http://localhost:8080/api/$idUser/pdf/$idRes');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        print(response.body);

      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
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

  Future<void> borrarResumen(String idUser, String idRes) async{
    
  try {
      final url = Uri.parse('http://localhost:8080/api/$idUser/resumen/$idRes');
      final response = await http.delete(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        print('Respuesta del servidor: ${response.body}');
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }
  
  Future<void> putLikeResume(String idUser, String idRes, WidgetRef ref) async {
    ResumenPreview resumen = ref.read(userNotifierProvider).getResumen(idRes);
    try {
      final url = Uri.parse('http://localhost:8080/api/$idUser/resumen/$idRes');
      final response = await http.put(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, bool>{
          'isFavourite': !resumen.isFavourite,
        }),
      );

      if (response.statusCode == 200) {
        await actualizarUsuario(idUser);
        print('hice Toggle en favorito: ${response.body}');
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }
  
  Future<void> actualizarResumenPoints(String idUser, String idRes, double rating, WidgetRef ref) async {
    try {
      final url = Uri.parse('http://localhost:8080/api/$idUser/resumen/$idRes');
      final response = await http.put(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, int>{
          'points': rating.round(),
        }),
      );

      if (response.statusCode == 200) {
        ref.read(resumenNotifierProvider.notifier).changeRating(idRes, rating.round());
        print('Respuesta del servidor: ${response.body}');
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }

    Future<void> actualizarUsuario(String idUser) async {
    
    try {
      final url = Uri.parse('http://localhost:8080/api/$idUser');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        final rsp = json.decode(response.body);

        User userActualizado = User(
            userName: rsp['userName'],
            id: rsp['id'],
            inventario: (rsp['inventario'] as List)
              .map((item) => ResumenPreview.fromJson(item))
              .toList(), 
            inProgress: rsp['inProgress'],
            isDark: rsp['config']['isDark'],
            provisoria: rsp['provisoria'],
          );

          ref.read(resumenNotifierProvider.notifier).changeList(userActualizado.inventario);
          ref.read(userNotifierProvider.notifier).setUserLogin(userActualizado);
          ref.read(userNotifierProvider.notifier).togleDarkMode(userActualizado.isDark);
      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
  }
}
