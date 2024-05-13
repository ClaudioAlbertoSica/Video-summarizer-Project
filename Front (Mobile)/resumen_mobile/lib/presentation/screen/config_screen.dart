import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
//COMENTO PORQUE AHORA NO USAMOS EL PROVIDER
//import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';


class ConfigScreen extends ConsumerWidget {
  const ConfigScreen({super.key});
  static const String name = 'ConfigScreen';

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
}
