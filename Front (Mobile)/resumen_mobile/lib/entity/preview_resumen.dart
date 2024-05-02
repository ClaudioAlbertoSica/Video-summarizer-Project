class ResumenPreview {
  final int id;
  final String image;
  final String title;
  final String range;

  ResumenPreview(
    {
      required this.id,
      required this.image,
      required this.title,
      required this.range
    }
  );

  factory ResumenPreview.fromJson(Map<String, dynamic> json) {
    return ResumenPreview(
      id: json['id'],
      image: json['image'],
      title: json['title'],
      range: json['range'],
    );
  }
}
