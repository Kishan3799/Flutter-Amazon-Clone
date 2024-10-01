import 'package:amazon_clone/features/accounts/services/account_services.dart';
import 'package:amazon_clone/features/accounts/widgets/account_button.dart';
import 'package:flutter/material.dart';

class TopButtons extends StatelessWidget {
  const TopButtons({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            AccountButton(text: "Your Order", onTap: (){}),
            AccountButton(text: "Turn Seller", onTap: (){}),
          ],
        ),
        const SizedBox(height: 10,),
         Row(
          children: [
            AccountButton(text: "Log Out", onTap: () => AccountSevices().logOut(context)),
            AccountButton(text: "Your Whish List", onTap: (){}),
          ],
        )
      ],
    );
  }
}