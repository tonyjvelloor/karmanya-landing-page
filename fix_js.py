import re

def update_file(filename, default_title, default_sub, default_wa, surgery_wa, parent_title, parent_wa, tried_title, tried_wa):
    with open(filename, 'r') as f:
        content = f.read()

    # We can just do a multi-line regex replacement of the whole window.KA_ANGLES block
    # It's safer to just replace the specific strings.
    
    replacements = {
        "Climb stairs again without dreading every step.": default_title,
        "Non-surgical Kerala Ayurvedic spine care in Pimple Saudagar, led by BAMS doctors. For knee arthritis, stiffness and cartilage wear.": default_sub,
        "Non-surgical Kerala Ayurvedic cervical care in Pimple Saudagar, led by BAMS doctors. For knee arthritis, stiffness and cartilage wear.": default_sub,
        "Namaste! I'd like to book a back pain assessment at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.": default_wa,
        "Namaste! I'd like to book a neck pain assessment at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.": default_wa,
        "Namaste! I've been advised spinal surgery and would like a non-surgical opinion at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.": surgery_wa,
        "Namaste! I've been advised cervical surgery and would like a non-surgical opinion at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.": surgery_wa,
        "Knee pain keeping your mother or father at home?": parent_title,
        "Namaste! I'd like to book a back pain assessment for my parent at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.": parent_wa,
        "Namaste! I'd like to book a neck pain assessment for my parent at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.": parent_wa,
        "Painkillers wear off in hours. Your knee pain doesn’t.": tried_title,
        "Namaste! I've tried other treatments for my back pain and would like to book an assessment at Karmanya Ayurveda, Pimple Saudagar.": tried_wa,
        "Namaste! I've tried other treatments for my neck pain and would like to book an assessment at Karmanya Ayurveda, Pimple Saudagar.": tried_wa,
        "For knee arthritis, stiffness and cartilage wear.": "For back pain, sciatica, and slip disc." if "back" in filename else "For cervical spondylosis and neck stiffness."
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    with open(filename, 'w') as f:
        f.write(content)

update_file('back.html',
    default_title="Heal Sciatica & Slip Disc Naturally.",
    default_sub="Non-surgical Kerala Ayurvedic spine care in Pimple Saudagar, led by BAMS doctors. For sciatica, slip disc, and chronic back pain.",
    default_wa="Namaste! I'd like to book a spine assessment at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.",
    surgery_wa="Namaste! I've been advised spinal surgery and would like a non-surgical opinion at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.",
    parent_title="Back pain keeping your mother or father at home?",
    parent_wa="Namaste! I'd like to book a spine assessment for my parent at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.",
    tried_title="Painkillers wear off in hours. Your back pain doesn’t.",
    tried_wa="Namaste! I've tried other treatments for my back pain and would like to book an assessment at Karmanya Ayurveda, Pimple Saudagar."
)

update_file('cervical.html',
    default_title="Relieve Neck Pain & Cervical Spondylosis without surgery.",
    default_sub="Non-surgical Kerala Ayurvedic cervical care in Pimple Saudagar, led by BAMS doctors. For cervical spondylosis, neck stiffness, and radiating shoulder pain.",
    default_wa="Namaste! I'd like to book a cervical assessment at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.",
    surgery_wa="Namaste! I've been advised cervical surgery and would like a non-surgical opinion at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.",
    parent_title="Neck pain keeping your mother or father at home?",
    parent_wa="Namaste! I'd like to book a cervical assessment for my parent at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.",
    tried_title="Painkillers wear off in hours. Your neck pain doesn’t.",
    tried_wa="Namaste! I've tried other treatments for my neck pain and would like to book an assessment at Karmanya Ayurveda, Pimple Saudagar."
)

print("Updated JS blocks in back.html and cervical.html")
