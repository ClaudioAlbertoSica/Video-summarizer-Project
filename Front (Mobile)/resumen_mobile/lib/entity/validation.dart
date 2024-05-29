class Validation {
  static final Validation _instance = Validation._internal();

  factory Validation() {
    return _instance;
  }

  Validation._internal();

  String password = '';
}

final validation = Validation();
