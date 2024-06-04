import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/entity/user.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/resumen_detail_screen.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class Server {

static const String urlBase = "http://192.168.0.31:8080/api/"; //"http://localhost:8080/api/"
static  String errorMessage = "";


static Future<bool> sendLoginData(String username, String password, WidgetRef ref) async {
    bool loginOk = false;
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('${urlBase}login');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String> {
          'userName': username,
          'passwd': password, 
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        //print('Respuesta del servidor: ${response.body}');
        
        final rsp = json.decode(response.body);

        User userLogueado = User(
            userName: rsp['userName'],
            id: rsp['id'],
            inventario: (rsp['inventario'] as List)
              .map((item) => ResumenPreview.fromJson(item))
              .toList(), 
            inProgress: rsp['inProgress'],
            isDark: rsp['config']['isDark'],
            provisoria: rsp['provisoria'],
          );

          ref.read(resumenNotifierProvider.notifier).changeList(userLogueado.inventario);
          ref.read(userNotifierProvider.notifier).setUserLogin(userLogueado);
          ref.read(userNotifierProvider.notifier).togleDarkMode(userLogueado.isDark);

        loginOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      //print(error);
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return loginOk;
  }

static Future<bool> recuperarContrasenia(String userName) async{
    bool sendOk = false;
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('${urlBase}recuperar');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String> {
          'userName': userName,
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        //print('Respuesta del servidor: ${response.body}');
                
        sendOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      //print(error);
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return sendOk;
  }

static Future<bool> isInProgress(String idUser, WidgetRef ref) async {
    bool inProgress = false;
    try {
      final url = Uri.parse('${urlBase}inprogress/$idUser');
      final response = await http.get(url, headers: <String, String> {
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        // Desestructura el JSON para obtener el campo "data"
        final jsonData = json.decode(response.body);
        inProgress = jsonData;
        //final userInProgress = jsonData['inProgress'];
        //inProgress = userInProgress as bool;
        ref.read(userNotifierProvider.notifier).setInProgress(inProgress);
        if(!inProgress){
          await actualizarUsuario(idUser, ref);
        }
      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
    return inProgress;
  }

static Future<void> actualizarUsuario(String idUser, WidgetRef ref) async {
    
    try {
      final url = Uri.parse('$urlBase$idUser');
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

static Future<bool> changePass(String passActual, String passNueva, String passNuevaBis, String idUser) async {
    bool changeOk = false;
    
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('${urlBase}cambiarpass/$idUser');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
        'passActual': passActual,
        'passNueva': passNueva,
        'passNuevaBis': passNuevaBis,
      }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        //print('Respuesta del servidor: ${response.body}');

        changeOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return changeOk;
  }

static Future<void> changeConfig(String idUser, WidgetRef ref) async {
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('$urlBase$idUser');
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
        //print('Respuesta del servidor: ${response.body}');
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
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }

static Future<bool> sendCreateUser(String username, String password) async {
    bool createOk = false;
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8080 instead of localhost:8080
      final url = Uri.parse(urlBase);
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String> {
          'userName': username,
          'passwd': password,
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        //print('Respuesta del servidor: ${response.body}');
        createOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return createOk;
  }

static  Future<bool> crearResumenTexto(String idUser, String texto, bool esBreve, String idioma, String? title, WidgetRef ref) async {
    bool creando = false;
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('$urlBase$idUser/resumen/texto');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, void>{
          'texto':texto,
          'esBreve':esBreve,
          'idioma':idioma,
          'title': title ?? ""
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        //print('Respuesta del servidor: ${response.body}');
        await isInProgress(idUser, ref);
        creando = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
    return creando;
  }

static  Future<bool> crearResumenVideo(String idUser, String urlYoutube, bool esBreve, String idioma, String title, WidgetRef ref) async {
    bool creando = false;
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('$urlBase$idUser/resumen/video');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, void>{
        'url':urlYoutube,
        'esBreve':esBreve,
        'idioma':idioma,
        'title': title
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        //print('Respuesta del servidor: ${response.body}');
        await isInProgress(idUser, ref);
        creando = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
    return creando;
  }

static Future<bool> enviarSugerencia(String idUser, String text) async {
    bool sendOk = false;
    try {
      final url = Uri.parse('$urlBase$idUser/sugerencia');
      final response = await http.post(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
        body: jsonEncode(<String, String> {
          'sugerencia': text,
        }),
      );

      if (response.statusCode == 200) {
        sendOk= true;
      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
    return sendOk;
  }

static Future<bool> enviarResumen(String idUser, String idRes) async {
  bool sendOk = false;
  try {
    final url = Uri.parse('$urlBase$idUser/enviar/$idRes');
    final response = await http.post(url, headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    });

    if (response.statusCode == 200) {
      sendOk = true;
      //print(response.body);

    } else {
      errorMessage = json.decode(response.body)['error'];
    }
  } catch (error) {
    errorMessage = 'Error: Connection ERROR - Server not found';
  }
  return sendOk;
}

static Future<void> mostrarPDF(BuildContext context,Uint8List pdfBytes) async {
    try {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => Scaffold(
            appBar: AppBar(title: const Text('PDF Viewer')),
            body: SfPdfViewer.memory(Uint8List.fromList(pdfBytes)),
          ),
        ));
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }

static Future<void> borrarResumen(String idUser, String idRes) async{
    
  try {
      final url = Uri.parse('$urlBase$idUser/resumen/$idRes');
      final response = await http.delete(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        //print('Respuesta del servidor: ${response.body}');
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }
  
static Future<void> putLikeResume(String idUser, String idRes, WidgetRef ref) async {
    ResumenPreview resumen = ref.read(userNotifierProvider).getResumen(idRes);
    if (resumen.idres == idRes) {
      try {
        final url = Uri.parse('$urlBase$idUser/resumen/$idRes');
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
          await actualizarUsuario(idUser, ref);
          //print('hice Toggle en favorito: ${response.body}');
        } else {
          errorMessage = json.decode(response.body)['error'];
        }
      } catch (error) {
        errorMessage = 'Error: Connection ERROR - Server not found';
      }
    } else {
        errorMessage = 'No se encontro un resumen con ese id.';
    }
  }
  
static Future<void> actualizarResumenPoints(String idUser, String idRes, double rating, WidgetRef ref) async {
    try {
      final url = Uri.parse('$urlBase$idUser/resumen/$idRes');
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
        await actualizarUsuario(idUser, ref);
        //ref.read(resumenNotifierProvider.notifier).changeRating(idRes, rating.round());
        //print('Respuesta del servidor: ${response.body}');
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
  }

static Future<void> completeResumen(String idUser, String idRes, BuildContext context, WidgetRef ref) async {
  ResumenPreview resumen = ref.read(userNotifierProvider).getResumen(idRes);
    if (resumen.idres == idRes) {
    try {
      final url = Uri.parse('$urlBase$idUser/resumen/$idRes');
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
        context.pushNamed(ResumenDetailScreen.name, extra: {'resumen': resumen, 'pdfBytes': pdfBytes});
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
    }else {
      errorMessage = 'No se encontro un resumen con ese id.';
    }
  }

static void showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMessage),
        backgroundColor: Colors.orange[700],
      ),
    );
  }

static void showMsg(BuildContext context, String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: Colors.orange[700],
      ),
    );
  }

}
