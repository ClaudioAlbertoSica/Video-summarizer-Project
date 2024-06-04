import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/report_screen.dart';
import '../uicoreStyles/uicore_our_app_bar.dart';


class FAQScreen extends ConsumerWidget {
  const FAQScreen({super.key});
  static const String name = 'FAQScreen';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    final isDark = ref.watch(userNotifierProvider).isDark;

    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: OurAppBar(),
      body: StackLayoutCustomized(
              keyboardHeight: MediaQuery.of(context).viewInsets.bottom,
              screenHeight: screenHeight,
              colorLight: const Color.fromRGBO(235, 240, 241, 1), 
              colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
              imageLigth:'FAQS.gif' , 
              imageDark:'FAQD.gif' , 
              content: [
                Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  ExpansionTile(
                                    title:  Text('¿Qué hace "Writer Rabbit"?',
                                              style: GoogleFonts.ubuntu(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0
                                              ),
                                            ),
                                    children: const [
                                      Text('Nuestra aplicación permite resumir contenido de manera rápida y eficiente. Podrás solicitar resúmenes escritos tanto de videos de Youtube como de textos.'),
                                    ],
                                  ),
                                  ExpansionTile(
                                    title:  Text('¿Cómo puedo solicitar resúmenes de contenido?',
                                              style: GoogleFonts.ubuntu(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0
                                              ),
                                            ),
                                    children: const [
                                        Text('Ingresa con tu usuario y contraseña.\nSelecciona el tipo de contenido que desees resumir.\nPuedes pedir resúmenes de texto simplemente copiando y pegando el contenido en el área designada de nuestra aplicación.\nPara resúmenes de videos de YouTube, solo necesitas ingresar el enlace del video.\nLuego, elige entre obtener un resumen extenso o breve, según tus preferencias.'),
                                    ],
                                  ),
                          
                                  ExpansionTile(
                                    title:  Text('¿Puedo personalizar mis preferencias para los resúmenes?',
                                              style: GoogleFonts.ubuntu(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0
                                              ),
                                            ),
                                    children: const [
                                      Text('¡Por supuesto! En nuestra aplicación, puedes personalizar tus preferencias para los resúmenes de varias formas. Puedes elegir entre obtener un resumen extenso o breve, seleccionar el idioma (inglés, español, francés o portugués) y colocarle un título.'),
                                    ],
                                  ),
                                  ExpansionTile(
                                    title:  Text('¿Qué tan preciso es el resumen generado por la aplicación?',
                                              style: GoogleFonts.ubuntu(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0
                                              ),
                                            ),
                                    children: const [
                                      Text('Nos esforzamos por brindar resúmenes precisos y relevantes. Nuestra tecnología utiliza inteligencia artificial para identificar y condensar la información esencial del contenido original. Así, obtenemos resúmenes de calidad sin perder lo importante. De todos modos, puedes proporcionar feedback sobre la calidad del resumen mediante un puntaje del 1 al 5, lo que nos ayuda a mejorar continuamente.'),
                                    ],
                                  ),

                                  ExpansionTile(
                                    title:  Text('¿Hay algún límite en la duración del video que puedo resumir?',
                                              style: GoogleFonts.ubuntu(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0
                                              ),
                                            ),
                                    children: const [
                                      Text('Actualmente tenemos un límite de duración del video a resumir, que es de un máximo de 5 minutos por el momento.'),
                                    ],
                                  ),

                                  ExpansionTile(
                                    title: Text('¿Cómo puedo contactar al soporte técnico de la aplicación si tengo algún problema o pregunta?',
                                              style: GoogleFonts.ubuntu(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0
                                              ),
                                            ),
                                    children: [
                                        //Wrap(
                                          //  children: [
                                              RichText(
                                                text: TextSpan(
                                                  style: TextStyle(
                                                    color: Theme.of(context).textTheme.bodyLarge?.color,
                                                    fontFamily: Theme.of(context).textTheme.bodyLarge?.fontFamily,
                                                    fontSize: Theme.of(context).textTheme.bodyMedium?.fontSize),
                                                  children: [
                                                    const TextSpan(
                                                        text: 'Si necesitas ayuda o tienes alguna pregunta, nuestro equipo de soporte técnico está aquí para ayudarte. Puedes contactarnos utilizando a través de nuestro ',
                                                      ),
                                                    WidgetSpan(
                                                        child: GestureDetector(
                                                                  onTap: () {
                                                                    context.pushNamed(ReportScreen.name);
                                                                  },
                                                                  child: Text(
                                                                            'formulario',
                                                                            style: TextStyle(
                                                                              color: isDark ? Theme.of(context).primaryColorLight : Theme.of(context).primaryColorDark,
                                                                              decoration: TextDecoration.none,
                                                                              fontFamily: Theme.of(context).textTheme.bodyLarge?.fontFamily,
                                                                              fontSize: Theme.of(context).textTheme.bodyMedium?.fontSize),
                                                                              ),
                                                                ),
                                                    ),
                                                  ]
                                                ),
                                              ),
                                            ],
                                          ),
                                      ],
                                  ),
                                ],
                              ),
                           // ],
                          //),
              ),
            ],
      ),
    );
  }
}
