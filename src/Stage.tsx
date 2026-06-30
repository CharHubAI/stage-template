# Lewd Attack - Core Stats Stage (Player Focused)

variables:
  user_health: 100
  user_max_health: 100
  user_stamina: 80
  user_max_stamina: 100
  user_lust: 0
  user_max_lust: 100
  user_corruption: 0
  user_gold: {{random:20,30,40,50,60,80,100}}
  user_reputation: 0
  user_clothing_integrity: 100
  user_pregnancy: 0
  user_submission: 0

on_start:
  - "Your Status: ❤️ Health {{user_health}}/{{user_max_health}} | ⚡ Stamina {{user_stamina}}/{{user_max_stamina}} | 🔥 Lust {{user_lust}} | 👗 Clothing {{user_clothing_integrity}}% | 💰 Gold {{user_gold}} | Submission {{user_submission}}"

rules:
  - if user_health <= 0: "💀 You have been defeated."
  - if user_stamina <= 20: "You are exhausted and weakened (can't fight or run effectively)."
  - if user_lust >= 70: "You are highly aroused and distracted."
  - if user_clothing_integrity <= 40: "Your torn clothing makes you more vulnerable to lust-driven creatures."
  - if user_pregnancy >= 30: "You feel subtle bodily changes (slow & rare progression)."
  - if user_submission >= 50: "You feel more submissive and obedient toward dominant partners."
  - "Max Health can increase through training, items, or story events."
