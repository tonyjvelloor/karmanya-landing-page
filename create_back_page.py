import re

with open('knee.html', 'r') as f:
    html = f.read()

replacements = {
    'Knee Pain Treatment Without Surgery': 'Sciatica & Slip Disc Treatment Without Surgery',
    'knee care': 'spine care',
    'Janu Basti': 'Kati Basti',
    'knee arthritis and stiffness': 'sciatica, slip disc, and back stiffness',
    'Knee pain\\?': 'Back pain or Sciatica?',
    'knee assessment': 'spine & posture assessment',
    'protocol-knee-janu-basti.webp': 'protocol-spine-kati-basti.webp',
    'knee replacement': 'spinal surgery',
    'knee pain': 'back pain',
    'Knee pain': 'Back pain',
    'Knee care': 'Spine care',
    'knee surgery': 'spinal surgery',
    'your knee': 'your spine',
    'Knee check': 'Back & Sciatica check',
    'Which of these sound like your knees\\?': 'Which of these sound like your back?',
    'knees': 'lower back',
    'Pain climbing or coming down stairs': 'Pain radiating down the leg (Sciatica)',
    'hard to sit on the floor or squat': 'pain when bending or lifting',
    'Hard to sit on the floor, squat or get up': 'Sharp pain when bending forward or lifting',
    'Stiff knees in the morning': 'Stiff lower back in the morning',
    'stiffness in the morning': 'stiffness in the lower back in the morning',
    'Clicking or grinding sound in the knee': 'Numbness or tingling in the toes/feet',
    'Swelling or warmth after walking': 'Unable to stand or walk for long periods',
    'a doctor has suggested knee replacement': 'a doctor has suggested spine surgery',
    'सीढ़ियाँ चढ़ते-उतरते दर्द': 'पैर में नीचे तक जाने वाला दर्द (साइटिका)',
    'ज़मीन पर बैठना या उठना मुश्किल': 'आगे झुकने या वजन उठाने में तेज दर्द',
    'सुबह या देर तक बैठने के बाद अकड़न': 'सुबह उठने पर कमर में अकड़न',
    'घुटने से कट-कट की आवाज़': 'पैरों या उंगलियों में सुन्नपन/झुनझुनी',
    'चलने के बाद सूजन': 'ज्यादा देर खड़े रहने या चलने में परेशानी',
    'घुटना बदलने की सलाह मिली है': 'स्पाइन सर्जरी (ऑपरेशन) की सलाह मिली है',
    'value="knee"': 'value="back"',
    'concern="knee"': 'concern="back"',
    'knee protocol': 'spine protocol',
    'The aim is to ease pain and stiffness, nourish the joint': 'The aim is to decompress the spinal nerves, nourish the discs',
    'warm medicated oil poured into a ring of herbal dough on the knee': 'warm medicated oil poured into a ring of herbal dough on the lower back',
    'ring of herbal dough on the knee': 'ring of herbal dough on the lower back',
    'knee osteoarthritis': 'lumbar spondylosis / slip disc',
    'stiffness in both knees': 'severe sciatica and back stiffness',
    'osteoarthritis or cartilage wear': 'sciatica, lumbar spondylosis, or slip disc'
}

for old, new in replacements.items():
    html = re.sub(old, new, html, flags=re.IGNORECASE if old not in ['Knee pain\\?', 'Knee check', 'Knee care', 'Knee pain', 'value="knee"', 'concern="knee"'] else 0)

with open('back.html', 'w') as f:
    f.write(html)

print("Created back.html")
