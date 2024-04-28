import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TitleStyle extends StatelessWidget {
  final String text;
  const TitleStyle({
    super.key,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return Text(text, style: GoogleFonts.baskervville(
        textStyle: Theme.of(context).textTheme.displayLarge,
        fontSize: 16,
        fontWeight: FontWeight.w700,
        fontStyle: FontStyle.normal,
        color: Colors.white
      ),
    );
  }
}
