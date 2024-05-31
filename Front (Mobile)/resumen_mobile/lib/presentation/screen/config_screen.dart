import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
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
                            onPressed: () async {
                              await Server.changeConfig(idUser, ref);
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


}
