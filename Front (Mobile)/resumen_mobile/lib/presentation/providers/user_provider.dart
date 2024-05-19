import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';

final userProvider = StateProvider<String?>((ref) => null);
final userDarkModeProvider = StateProvider<bool?>((ref) => false);
final userListSummaryProvider = StateProvider<List<ResumenPreview>>((ref)=>[]);
