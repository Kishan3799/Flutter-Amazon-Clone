import 'package:amazon_clone/constants/global_variable.dart';
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final VoidCallback onTap;
  const CustomButton({super.key, required this.text, required this.onTap,  this.backgroundColor = GlobalVariables.secondaryColor, this.foregroundColor});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onTap, 
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor,
        foregroundColor: foregroundColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4)
        ),
        minimumSize: const Size(double.infinity, 50)
      ),
      child: Text(text),
    );
  }
}