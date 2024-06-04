import 'package:flutter/material.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';

class StackLayout extends StatefulWidget {
  const StackLayout({
    super.key,
    required this.screenHeight,
    required this.backgroundImage,
    required this.content,
    required this.backgroundColor,
    required this.keyboardHeight,
  });

  final double keyboardHeight;
  final double screenHeight;
  final String backgroundImage;
  final List<Widget> content;
  final Color backgroundColor;

  @override
  State<StackLayout> createState() => _StackLayoutState();
}

class _StackLayoutState extends State<StackLayout> {
  @override
  Widget build(BuildContext context) {
/*     final double keyboardHeight = MediaQuery.of(context).viewInsets.bottom; */
    
    return Stack(
      children: [
        Container(
          height: widget.screenHeight * 0.33,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/${widget.backgroundImage}'),
              fit: BoxFit.cover,
            ),
          ),
        ),
        Positioned.fill(
          child: ClipPath(
            clipper: MountainClipperMediumFlat(keyboardSize: widget.keyboardHeight),
            child: Container(
             color: widget.backgroundColor, // Cambia este color al color que desees para el fondo dentado
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15),
          child: Column(
            children: [
              SizedBox(
                height: widget.keyboardHeight < 60 ? widget.screenHeight * 0.32 : 30
              ),
              ...widget.content
            ],
          ),
        ),
      ],
    );
  }
}
