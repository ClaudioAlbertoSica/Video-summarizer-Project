import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/entity/user.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:http/http.dart' as http;
import '../uicoreStyles/uicore_our_app_bar.dart';

class ConfigScreen extends ConsumerWidget {
  ConfigScreen({super.key});
  static const String name = 'ConfigScreen';
  String errorMessage = '';
  

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDarkUser = ref.watch(userNotifierProvider).isDark;
    final idUser = ref.watch(userNotifierProvider).id;
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: OurAppBar(),
      body: StackLayoutCustomized(
              screenHeight: screenHeight,
              colorLight: const Color.fromRGBO(235, 240, 241, 1), 
              colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
              imageLigth:'darkScreen.gif' , 
              imageDark:'darkScreen.gif' , 
              content: [
                Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Text(isDarkUser ? 'Modo claro' : 'Modo oscuro'),
                          IconButton(
                            onPressed: () {
                              changeConfig(idUser, ref);
                            },
                            icon: isDarkUser ? const Icon(Icons.light_mode) : const Icon(Icons.dark_mode))
                        ],
                      ),
                    ],
                  ),
              ),
            ],
      ),
    );
  }


void changeConfig(String idUser, WidgetRef ref) async {
    bool changeOk = false;
    
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('http://localhost:8080/api/$idUser');
      final response = await http.put(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, void>{
          'config': {
            'isDark': !(ref.read(userNotifierProvider).isDark)
          }}
        ),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        print('Respuesta del servidor: ${response.body}');
        final rsp = json.decode(response.body);
        User userModificado = User(
          userName: rsp['userName'],
          id: rsp['id'],
          inventario: (rsp['inventario'] as List)
              .map((item) => ResumenPreview.fromJson(item))
              .toList(), 
          inProgress: rsp['inProgress'],
          isDark: rsp['config']['isDark'],
          provisoria: rsp['provisoria'],
          );
          
          ref.read(userNotifierProvider.notifier).setUserLogin(userModificado);
          ref.read(userNotifierProvider.notifier).togleDarkMode(userModificado.isDark);
        changeOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }

}
