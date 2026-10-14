/*
 * Everything on the homepage that is not already in the HTML: the English for each `data-i18n` key,
 * and the content of the moving parts in both languages. Every claim here is one the app makes
 * good on: roles and what each may see are the app's own (src/domain/permissions.ts), the morning
 * brief is the one the server sends at 08:30, and the Quick Add examples were run through the
 * bundled reader before they went in. Names and items in the small demonstrations are the demo
 * household's, not anybody's real data.
 */
window.RAVO_COPY = {
  en: {
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    navPlace: 'One place', navStory: 'How it works', navTry: 'Try it', navRoles: 'Home & Business', navFaq: 'FAQ',
    getApp: 'Get the app',
    heroPill: 'Free on the App Store · for iPhone',
    heroTitle: 'Less managing each other.<br><em>More living together.</em>',
    heroLede: 'RAVO keeps everything that holds a home together — tasks, shopping, the calendar and the bills — in one place everyone sees. Everyone knows what’s theirs, and nobody has to ask the group again.',
    downloadOn: 'Download on the',
    heroMore: 'How it works',
    altToday: 'RAVO’s Today screen: what each person at home has on, the shopping, today’s events and the bills',
    pingAt: 'Shopping list', pingA: 'Noa added milk and bread',
    pingBt: 'Reminder', pingB: 'Daniel’s judo · 16:30',
    placeEyebrow: 'One place',
    placeTitle: 'Instead of five group chats and a note on the fridge.',
    placeLede: 'Everything the home needs to remember sits in one place, in sync on everyone’s phone in real time. Who added it, who bought it and who finished it — everyone sees the same thing.',
    aTasks: 'Tasks', aTasksL: 'Everything has an owner and a date',
    aShop: 'Shopping', aShopL: 'One list, on every phone',
    aCal: 'Calendar', aCalL: 'Clubs, appointments, dinners',
    aBills: 'Bills', aBillsL: 'What’s paid and what’s due',
    aPeople: 'The household', aPeopleL: 'Everyone by their role',
    storyLabel: 'How RAVO works',
    bEyebrow: 'Tasks',
    bTitle: 'Tasks, without chasing anyone.',
    bLede: 'Every task has an owner and a date. Whoever has it gets a reminder on time, and whoever finishes it ticks it off — and everyone sees it’s done.',
    bRow1: 'Walk the dog', bRow2: 'Pick Daniel up from judo · 16:30', bRow3: 'Change the bedding · every week',
    altTasks: 'RAVO’s Tasks screen: the household’s tasks by day, with who owns each one',
    cEyebrow: 'Shopping',
    cTitle: 'Someone added milk. It’s already on your list in the shop.',
    cLede: 'One list for the whole home, sorted by aisle. Whoever is in the shop ticks off what goes in the trolley, and whoever is at home sees what’s been picked up as it happens.',
    cRow1: 'Milk', cRow2: 'Tomatoes', cRow3: 'Wholemeal bread',
    cDept1: 'Dairy', cDept2: 'Fruit & veg', cDept3: 'Bakery',
    altShopping: 'RAVO’s shopping list, sorted by aisle',
    dEyebrow: 'Calendar and morning brief',
    dTitle: 'Every morning at 08:30, everyone knows what’s theirs.',
    dLede: 'Clubs, appointments and dinners in one shared calendar, with a reminder beforehand. And in the morning RAVO sends each person one short message with what’s waiting for them today — only what their role lets them see.',
    dNow: 'now', dParent: 'Good morning Noa ☀️', dParent1: '📅 Daniel’s judo at 16:30', dParent2: '💳 Electricity bill due by Thursday',
    dChild: 'Good morning Daniel ☀️', dChild1: '✅ Feed the fish',
    altCalendar: 'RAVO’s home calendar: the whole family’s week',
    eEyebrow: 'Bills and spending',
    eTitle: 'The home’s money, clear too.',
    eLede: 'Bills with an amount and a due date, a reminder before they’re due, this month’s spending and standing orders. Whoever marks a bill paid — everyone knows, and nobody pays twice.',
    eBill: 'Electricity', eDue: 'by Thursday', ePaid: 'Paid', eLock: 'Parents only',
    altMoney: 'Household money in RAVO: bills to pay and this month’s spending',
    tryEyebrow: 'Quick Add · try it now',
    tryTitle: 'Write a sentence.<br><em>RAVO reads it.</em>',
    tryLede: 'Write it like a message to a friend, and RAVO recognises a task, a shopping item, an event or a bill — with the day, the time, the amount and who’s on it.',
    tryNote: 'This is the app’s real engine, running in your browser. Nothing is sent anywhere. Free-text reading is built for Hebrew.',
    trySpace: 'Space', tryLabel: 'A sentence to try',
    rolesEyebrow: 'For every home, and every business',
    rolesTitle: 'Everyone sees what’s theirs.',
    rolesLede: 'Invite whoever you need and give them a role. Permissions are enforced on the server, not just on the screen: children don’t see bills, and staff don’t see spending.',
    trustEyebrow: 'Privacy',
    trustTitle: 'Your home’s information<br><em>is not the product.</em>',
    t1t: 'Everyone sees what’s theirs', t1: 'Every space is private to its members, and each person sees only what their role allows. Permissions are enforced on the server.',
    t2t: 'No ads', t2: 'We don’t sell information or show adverts. Content is used only to run the service.',
    t3t: 'Delete in a tap', t3: 'Delete your account in Settings and it’s gone at once.',
    faqEyebrow: 'FAQ', faqTitle: 'Before you start',
    q1: 'What does it cost?',
    a1: 'RAVO is currently free: no subscription, no in-app purchases, no ads, and we don’t ask for a payment method. If paid features are ever added, we’ll tell you in advance, and nothing will be charged without your explicit consent.',
    q2: 'What’s the difference between RAVO Home and RAVO Business?',
    a2: 'It’s one app with two kinds of space. Home is shaped for a household: shopping, a family calendar, bills, and roles like parent and child. Business is shaped for a business: issues, procurement, vendors, equipment, team updates, and roles like management and staff. One account can have both.',
    q3: 'How do I bring in my family or my team?',
    a3: 'Send an invitation to their email and choose a role. It’s valid for seven days, and they join straight into the right space.',
    q4: 'What does the assistant do?',
    a4: 'The assistant surfaces tasks that stalled or were left without an owner, bills coming due, urgent issues, duplicates and overlapping events — and suggests the next step. It never changes or deletes anything by itself.',
    q5: 'What do children or staff see?',
    a5: 'Only what their role allows. At home, children don’t see bills or amounts. At work, staff don’t see spending or management information.',
    q6: 'How do reminders work?',
    a6: 'A task with a time reminds you at that time, a bill a few days before it’s due, and an event an hour before. Settings let you choose which kinds ring.',
    q7: 'Which devices does it run on?',
    a7: 'RAVO is currently available for iPhone, in Hebrew and English.',
    q8: 'Where is the information stored?',
    a8: 'With our infrastructure provider Supabase, on servers in Seoul, South Korea, and connections and storage are encrypted (not end-to-end). In the app, only the space’s members can see it, each according to their role; the operator and infrastructure providers have limited technical access, for operation and security only. The full detail is in the <a href="privacy/">privacy policy</a>.',
    finaleTitle: 'The house sorts itself out.<br><em>You get to breathe.</em>',
    finaleLede: 'Download it, open a home or a business, and invite whoever you need. It takes a minute.',
    finaleNote: 'RAVO is currently free · for iPhone',
    footerLine: 'Order, ownership and coordination — at home and at work.',
    legalNav: 'Legal information',
    fSupport: 'Support', fPrivacy: 'Privacy', fTerms: 'Terms', fAccess: 'Accessibility',
    footerAsk: 'Have a question?', rights: '· All rights reserved'
  },

  scenes: {
    /* Quick Add. Every example was run through the bundled reader before it went here. */
    examples: {
      home: ['תזכיר לי מחר בשמונה בערב להתקשר לרופא', 'חלב, ביצים ולחם', 'לשלם ארנונה 480 ש״ח עד 15/11', 'להחליף מצעים כל שבוע'],
      office: ['דחוף לתקן את המזגן בחדר הישיבות', 'להזמין טונר ונייר למדפסת', 'ישיבת צוות ביום ראשון ב־10:00', 'חשבונית ספק 1450 ש״ח עד 10/11']
    },
    kinds: {
      task: { he: 'משימה', en: 'Task' }, shopping: { he: 'קניות', en: 'Shopping' }, bill: { he: 'חשבון', en: 'Bill' },
      calendar_event: { he: 'יומן', en: 'Calendar' }, procurement: { he: 'רכש', en: 'Procurement' },
      expense: { he: 'הוצאה', en: 'Expense' }, maintenance: { he: 'תקלה', en: 'Issue' }
    },
    labels: {
      read: { he: 'RAVO זיהה', en: 'RAVO read' },
      unsure: { he: 'זה יכול להתאים לכמה מקומות — באפליקציה בוחרים בהקשה:', en: 'It could go a few places — in the app you choose with a tap:' },
      empty: { he: 'כתבו משפט, או בחרו דוגמה.', en: 'Type a sentence, or pick an example.' },
      when: { he: 'מתי', en: 'When' }, time: { he: 'שעה', en: 'Time' }, amount: { he: 'סכום', en: 'Amount' },
      owner: { he: 'אחראי/ת', en: 'Owner' }, urgent: { he: 'דחוף', en: 'Urgent' }, repeats: { he: 'חוזר', en: 'Repeats' },
      items: { he: 'פריטים', en: 'Items' }, qty: { he: 'כמות', en: 'Quantity' },
      repeat: { daily: { he: 'כל יום', en: 'every day' }, weekly: { he: 'כל שבוע', en: 'every week' }, monthly: { he: 'כל חודש', en: 'every month' }, yearly: { he: 'כל שנה', en: 'every year' } },
      confirm: { he: 'באפליקציה: הקשה אחת לאישור, והוא בפנים.', en: 'In the app: one tap to confirm, and it’s in.' }
    },

    /* The roles, word for word as the app describes them (src/domain/permissions.ts). */
    roles: {
      home: {
        screen: 'household',
        alt: { he: 'בני הבית ב־RAVO, עם התפקיד של כל אחד', en: 'The household in RAVO, with each person’s role' },
        title: { he: 'RAVO Home', en: 'RAVO Home' },
        lede: { he: 'למשפחות, לזוגות ולשותפים לדירה. מי אוסף, מה חסר, מה צריך לשלם ומה קורה השבוע.', en: 'For families, couples and flatmates. Who’s picking up, what’s missing, what needs paying and what’s on this week.' },
        roles: [
          { icon: '🏡', colour: '#55613A', name: { he: 'בעלים', en: 'Owner' }, can: { he: 'גישה מלאה לניהול הבית, כולל חשבונות והרשאות.', en: 'Full access to running the home, including bills and permissions.' } },
          { icon: '🧑', colour: '#4F8A7E', name: { he: 'הורה', en: 'Parent' }, can: { he: 'גישה מלאה לניהול השוטף, כולל חשבונות.', en: 'Full access to the day-to-day, including bills.' } },
          { icon: '🧒', colour: '#C56347', name: { he: 'ילד/ה', en: 'Child' }, can: { he: 'משימות, קניות ותוכן משפחתי. ללא גישה לחשבונות.', en: 'Tasks, shopping and family content. No access to bills.' } },
          { icon: '🧹', colour: '#B98B3E', name: { he: 'עובד/ת משק בית', en: 'Household help' }, can: { he: 'רואה רק משימות ומידע שנדרש לעבודת הבית.', en: 'Sees only the tasks and information the work needs.' } },
          { icon: '👋', colour: '#7C7FB8', name: { he: 'אורח/ת', en: 'Guest' }, can: { he: 'רואה רק תוכן ששותף איתו במפורש.', en: 'Sees only what has been shared with them.' } }
        ]
      },
      biz: {
        screen: 'office',
        alt: { he: 'מסך היום בעסק של RAVO Business', en: 'The RAVO Business Today screen' },
        title: { he: 'RAVO Business', en: 'RAVO Business' },
        lede: { he: 'לכל עסק עם צוות: משרדים, חנויות, קליניקות ומסעדות. מי מטפל בתקלה, מה להזמין ומה סוכם.', en: 'For any business with a team: offices, shops, clinics and restaurants. Who’s on the fault, what to order and what was agreed.' },
        roles: [
          { icon: '🏢', colour: '#55613A', name: { he: 'הנהלה', en: 'Management' }, can: { he: 'גישה מלאה לניהול העסק, הצוות, ההוצאות וההרשאות.', en: 'Full access to the business, the team, spending and permissions.' } },
          { icon: '📋', colour: '#4F8A7E', name: { he: 'מנהל/ת', en: 'Manager' }, can: { he: 'ניהול תפעולי רחב: משימות, רכש, ציוד, ספקים, תחזוקה ועדכונים.', en: 'Broad operations: tasks, procurement, equipment, vendors, maintenance and updates.' } },
          { icon: '💼', colour: '#C56347', name: { he: 'עובד/ת', en: 'Staff' }, can: { he: 'עבודה שוטפת, רכש ומטבחון, יומן, הודעות ודיווח על תקלות. ללא מידע כספי.', en: 'Day-to-day work, procurement and kitchenette, calendar, updates and reporting issues. No financial information.' } },
          { icon: '🔧', colour: '#B98B3E', name: { he: 'תפעול', en: 'Operations' }, can: { he: 'תפעול, מטבחון ותחזוקה בלבד. ללא הוצאות או מידע ניהולי.', en: 'Operations, kitchenette and maintenance only. No spending or management information.' } },
          { icon: '🤝', colour: '#7C7FB8', name: { he: 'אורח/ת או ספק', en: 'Guest or vendor' }, can: { he: 'גישה מצומצמת לעדכונים ששותפו, ללא ניהול העסק.', en: 'Limited access to shared updates, without running the business.' } }
        ]
      }
    }
  }
}
