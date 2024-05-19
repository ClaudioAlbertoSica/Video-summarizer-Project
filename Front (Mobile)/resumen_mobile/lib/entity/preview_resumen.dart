class ResumenPreview {
  final int id;
  final String? image;
  final String title;
  final String range;
  final bool isFavourite;

  ResumenPreview(
    {
      required this.id,
      this.image,
      required this.title,
      required this.range,
      required this.isFavourite,
    }
  );

  factory ResumenPreview.fromJson(Map<String, dynamic> json) {
    return ResumenPreview(
      id: json['id'],
      image: json['image'],
      title: json['title'],
      range: json['range'],
      isFavourite: json['isFavourite']
    );
  }
}
