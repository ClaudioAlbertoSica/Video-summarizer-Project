import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
//COMENTO PORQUE AHORA NO USAMOS EL PROVIDER
//import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:http/http.dart' as http;


class ConfigScreen extends ConsumerWidget {
  ConfigScreen({super.key});
  static const String name = 'ConfigScreen';
  String errorMessage = '';
  

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //COMENTO PORQUE AHORA NO LO USAMOS
    //final idUser = ref.watch(userProvider.notifier).state;
    final isDark = ref.watch(themeNotifierProvider).isDark;
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
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
                          Text(isDark ? 'Light mode' : 'Dark mode'),
                          IconButton(
                            onPressed: () {
                              ref.read(themeNotifierProvider.notifier).togleDarkMode();
                              

                            },
                            icon: isDark ? const Icon(Icons.light_mode) : const Icon(Icons.dark_mode))
                        ],
                      ),
                    ],
                  ),
              ),
            ],
      ),
    );
  }


Future<bool> changeConfig(WidgetRef ref, String idUser) async {
    bool changeOk = false;
    
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('http://10.0.2.2:8080/api/$idUser');
      final response = await http.put(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, void>{
          'config': {
            'darkMode': ref.read(themeNotifierProvider).isDark
          }}
        ),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        print('Respuesta del servidor: ${response.body}');

        changeOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return changeOk;
  }

}
