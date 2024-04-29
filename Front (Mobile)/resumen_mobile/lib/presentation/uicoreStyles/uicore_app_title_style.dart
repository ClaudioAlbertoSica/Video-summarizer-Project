import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTitleStyle extends StatelessWidget {
  final String text;
  final Color color;
  const AppTitleStyle({
    super.key,
    required this.text,
    required this.color
  });

  @override
  Widget build(BuildContext context) {
    return Text(text, style: GoogleFonts.baskervville(
        textStyle: Theme.of(context).textTheme.displayLarge,
        fontSize: 28,
        fontWeight: FontWeight.w700,
        fontStyle: FontStyle.normal,
        color: color,
      ),
    );
  }
}
