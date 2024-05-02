import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../../core/data/resume_datasource.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_book_button.dart';
import '../uicoreStyles/uicore_paragraph_style.dart';

class HomeScreen extends StatelessWidget {
  static const String name = 'HomeScreen';
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text:'David Og', color: Colors.black),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: BoxDecoration(
          color: Colors.grey[200], // Color de fondo
        ),
        padding: const EdgeInsets.all(15.0),
        child: Column(
          children: [
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  // Para ajustar la cantidad
                  crossAxisCount: 2, 
                  // Ajusta según el aspecto deseado de los tiles
                  childAspectRatio: 0.9, 
                  crossAxisSpacing: 3,
                ),
                itemCount: resumenList.length,
                itemBuilder: (context, index) {
                  final resumen = resumenList[index];
                  return Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: BookButton(resumen: resumen),
                  );
                },
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Acción para el primer botón
                  },
                  child: const Text('Botón 1'),
                ),
                ElevatedButton(
                  onPressed: () {
                    // Acción para el segundo botón
                  },
                  child: const Text('Botón 2'),
                ),
              ],
            ),
          ],
        ),
      )
    );
  }
}
