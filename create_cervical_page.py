import re

with open('knee.html', 'r') as f:
    html = f.read()

replacements = {
    'Knee Pain Treatment Without Surgery': 'Cervical & Neck Pain Treatment Without Surgery',
    'knee care': 'neck care',
    'Janu Basti': 'Greeva Basti',
    'knee arthritis and stiffness': 'cervical spondylosis and neck stiffness',
    'Knee pain\\?': 'Neck pain or Spondylosis?',
    'knee assessment': 'cervical & posture assessment',
    'protocol-knee-janu-basti.webp': 'protocol-cervical-greeva-basti.webp',
    'knee replacement': 'cervical spine surgery',
    'knee pain': 'neck pain',
    'Knee pain': 'Neck pain',
    'Knee care': 'Cervical care',
    'knee surgery': 'cervical surgery',
    'your knee': 'your neck',
    'Knee check': 'Cervical & Neck check',
    'Which of these sound like your knees\\?': 'Which of these sound like your neck?',
    'knees': 'neck and shoulders',
    'Pain climbing or coming down stairs': 'Pain radiating down the arm or shoulder',
    'hard to sit on the floor or squat': 'Pain when working on laptop or looking down',
    'Hard to sit on the floor, squat or get up': 'Sharp pain when looking down or working',
    'Stiff knees in the morning': 'Stiff neck in the morning',
    'stiffness in the morning': 'stiffness in the neck in the morning',
    'Clicking or grinding sound in the knee': 'Numbness or tingling in the fingers/hands',
    'Swelling or warmth after walking': 'Frequent headaches or vertigo (dizziness)',
    'a doctor has suggested knee replacement': 'a doctor has suggested cervical spine surgery',
    'सीढ़ियाँ चढ़ते-उतरते दर्द': 'हाथ या कंधे में नीचे तक जाने वाला दर्द',
    'ज़मीन पर बैठना या उठना मुश्किल': 'लैपटॉप पर काम करते समय या नीचे देखते समय दर्द',
    'सुबह या देर तक बैठने के बाद अकड़न': 'सुबह उठने पर गर्दन में अकड़न',
    'घुटने से कट-कट की आवाज़': 'उंगलियों या हाथों में सुन्नपन/झुनझुनी',
    'चलने के बाद सूजन': 'लगातार सिरदर्द या चक्कर आना (वर्टिगो)',
    'घुटना बदलने की सलाह मिली है': 'सर्वाइकल सर्जरी (ऑपरेशन) की सलाह मिली है',
    'value="knee"': 'value="neck"',
    'concern="knee"': 'concern="neck"',
    'knee protocol': 'cervical protocol',
    'The aim is to ease pain and stiffness, nourish the joint': 'The aim is to relieve muscle spasm, decompress the cervical nerves',
    'warm medicated oil poured into a ring of herbal dough on the knee': 'warm medicated oil poured into a ring of herbal dough on the back of the neck',
    'ring of herbal dough on the knee': 'ring of herbal dough on the back of the neck',
    'knee osteoarthritis': 'cervical spondylosis',
    'stiffness in both knees': 'severe neck stiffness and desk posture pain',
    'osteoarthritis or cartilage wear': 'cervical spondylosis or text neck'
}

for old, new in replacements.items():
    html = re.sub(old, new, html, flags=re.IGNORECASE if old not in ['Knee pain\\?', 'Knee check', 'Knee care', 'Knee pain', 'value="knee"', 'concern="knee"'] else 0)

with open('cervical.html', 'w') as f:
    f.write(html)

print("Created cervical.html")
