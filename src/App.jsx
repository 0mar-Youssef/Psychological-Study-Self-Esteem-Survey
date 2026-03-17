import { useState } from "react";

const demographicsQuestions = [
  { 
    id: "age", 
    label: "What is your age?", 
    type: "number" 
  },
  {
    id: "gender",
    label: "What is your gender?",
    type: "select",
    options: ["Male", "Female", "Prefer not to say", "Other"],
    hasOther: true,
  },
  { 
    id: "ethnicity", 
    label: "What is your ethnicity? (optional)", 
    type: "text",
    required: false 
  },
  { 
    id: "country", 
    label: "What country do you currently live in?", 
    type: "text" 
  },
  {
    id: "education",
    label: "What is your highest level of education completed?",
    type: "select",
    options: [
      "Some high school",
      "High school diploma/GED",
      "Some college",
      "Associate's degree",
      "Bachelor's degree",
      "Graduate degree"
    ],
  },
  {
    id: "employment",
    label: "What is your current employment status?",
    type: "select",
    options: ["Student", "Employed full-time", "Employed part-time", "Unemployed", "Other"],
    hasOther: true,
  },
];

const familyQuestions = [
  {
    id: "raised_by",
    label: "Who primarily raised you?",
    type: "select",
    options: ["Both parents", "One parent", "Grandparents", "Foster care", "Other"],
    hasOther: true,
  },
  {
    id: "childhood_environment",
    label: "How would you describe your childhood home environment?",
    type: "select",
    options: ["Supportive", "Somewhat supportive", "Neutral", "Unstable", "Chaotic"],
  },
  {
    id: "adults_emotionally_available",
    label: "Were the adults around you emotionally available?",
    type: "likert",
  },
  {
    id: "comfortable_asking_help",
    label: "Growing up, how comfortable were you asking for help from your caregivers?",
    type: "likert",
  },
];

const healthQuestions = [
  {
    id: "seen_therapist",
    label: "Have you ever seen a therapist or counselor?",
    type: "yesno",
  },
  {
    id: "long_stress_periods",
    label: "Have you ever experienced long periods of stress, anxiety, or depression?",
    type: "yesno",
  },
  {
    id: "overwhelming_emotions",
    label: "Do you currently struggle with overwhelming emotions?",
    type: "yesno",
  },
  {
    id: "comfortable_expressing_feelings",
    label: "How comfortable are you expressing your feelings to others?",
    type: "likert",
  },
];

const socialQuestions = [
  {
    id: "close_friends_count",
    label: "How many close friends do you currently have?",
    type: "select",
    options: ["0", "1-2", "3-5", "6-10", "More than 10"],
  },
  {
    id: "judged_for_mistakes",
    label: "Growing up, did you feel judged by others when you made mistakes?",
    type: "likert",
  },
  {
    id: "school_encouraged_help",
    label: "Did your school environment encourage asking for help?",
    type: "likert",
  },
  {
    id: "feel_supported_today",
    label: "Do you feel supported by the people around you today?",
    type: "likert",
  },
  {
    id: "rely_on_support",
    label: "How often do you rely on your friends or family when you're struggling?",
    type: "likert",
  },
];

const personalityQuestions = [
  {
    id: "personality_type",
    label: "How would you describe your personality?",
    type: "select",
    options: ["Introverted", "Extroverted", "Ambivert"],
  },
  {
    id: "usual_reaction",
    label: "When something is wrong, what is your usual reaction?",
    type: "select",
    options: ["Hide it", "Talk to someone", "Try to fix it alone", "Distract myself", "Other"],
    hasOther: true,
  },
  {
    id: "comfortable_vulnerability",
    label: "How comfortable are you with showing vulnerability?",
    type: "likert",
  },
  {
    id: "ashamed_needing_help",
    label: "Do you tend to feel ashamed when you need help?",
    type: "likert",
  },
];

const earlyChildhoodQuestions = [
  { id: "ec1", label: "I did not feel safe expressing my emotions as a child.", type: "likert", negative: true },
  { id: "ec2", label: "Adults in my childhood home often reacted negatively when I was upset.", type: "likert", negative: true },
  { id: "ec3", label: "I was punished or criticized for showing sadness.", type: "likert", negative: true },
  { id: "ec4", label: "I felt uncomfortable asking my caretakers for help.", type: "likert", negative: true },
  { id: "ec5", label: "I often hid my problems to avoid upsetting my family.", type: "likert", negative: true },
  { id: "ec6", label: "I believed mistakes were unacceptable in my household.", type: "likert", negative: true },
  { id: "ec7", label: "I did not feel supported when I struggled with something.", type: "likert", negative: true },
  { id: "ec8", label: "I feared being judged by family members.", type: "likert", negative: true },
  { id: "ec9", label: "I felt like a burden when I needed help.", type: "likert", negative: true },
  { id: "ec10", label: "I learned early on not to talk about my feelings.", type: "likert", negative: true },
];

const childhoodSocialQuestions = [
  { id: "cs1", label: "I did not feel safe sharing my struggles with peers.", type: "likert", negative: true },
  { id: "cs2", label: "I was bullied or teased for showing vulnerability.", type: "likert", negative: true },
  { id: "cs3", label: "I often compared myself negatively to other kids.", type: "likert", negative: true },
  { id: "cs4", label: "I did not have any adult outside my family that I trusted.", type: "likert", negative: true },
  { id: "cs5", label: "I hid personal problems from friends.", type: "likert", negative: true },
  { id: "cs6", label: "I believed other kids were stronger or more capable than me.", type: "likert", negative: true },
  { id: "cs7", label: "I felt misunderstood by my childhood friends.", type: "likert", negative: true },
  { id: "cs8", label: "I feared embarrassment at school.", type: "likert", negative: true },
  { id: "cs9", label: "I kept quiet even when I needed help.", type: "likert", negative: true },
  { id: "cs10", label: "I felt pressure to appear \"strong\" among peers.", type: "likert", negative: true },
];

const familyDynamicsQuestions = [
  { id: "fd1", label: "My family did not communicate openly about emotions.", type: "likert", negative: true },
  { id: "fd2", label: "I was discouraged from showing vulnerability.", type: "likert", negative: true },
  { id: "fd3", label: "I felt pressure to be \"the strong one\" in the family.", type: "likert", negative: true },
  { id: "fd4", label: "Family members minimized or dismissed my problems.", type: "likert", negative: true },
  { id: "fd5", label: "I feared disappointing my family by asking for help.", type: "likert", negative: true },
  { id: "fd6", label: "I learned to solve problems without support.", type: "likert", negative: true },
  { id: "fd7", label: "My household discouraged emotional expression.", type: "likert", negative: true },
  { id: "fd8", label: "I felt responsible for keeping peace in my home.", type: "likert", negative: true },
  { id: "fd9", label: "I rarely felt understood by family members.", type: "likert", negative: true },
  { id: "fd10", label: "My family believed asking for help was a sign of weakness.", type: "likert", negative: true },
];

const recoveryQuestions = [
  { id: "rg1", label: "I still feel unsafe asking for help, even compared to the past.", type: "likert", negative: true },
  { id: "rg2", label: "I believe vulnerability is a weakness.", type: "likert", negative: true },
  { id: "rg3", label: "I feel uncomfortable being honest about my emotions.", type: "likert", negative: true },
  { id: "rg4", label: "I feel like people around me don't really care about my well-being.", type: "likert", negative: true },
  { id: "rg5", label: "I don't believe seeking help actually makes things better.", type: "likert", negative: true },
  { id: "rg6", label: "Opening up has mostly led to negative experiences for me.", type: "likert", negative: true },
  { id: "rg7", label: "I avoid reaching out even when I feel overwhelmed.", type: "likert", negative: true },
  { id: "rg8", label: "I believe it's risky or shameful to ask for support.", type: "likert", negative: true },
  { id: "rg9", label: "I don't feel hopeful about improving how I communicate.", type: "likert", negative: true },
  { id: "rg10", label: "I feel stuck in the way I deal with emotional struggles.", type: "likert", negative: true },
];

const supportSystemsQuestions = [
  { id: "ss1", label: "I have mostly had negative experiences with teachers, counselors, or mentors.", type: "likert", negative: true },
  { id: "ss2", label: "I am uncomfortable seeking help from people who don't share my background or language.", type: "likert", negative: true },
  { id: "ss3", label: "I feel less safe getting help in person compared to online.", type: "likert", negative: true },
];

const readinessQuestions = [
  { id: "rc1", label: "I feel resistant to becoming more comfortable asking for help.", type: "likert", negative: true },
  { id: "rc2", label: "I am very critical of myself when I struggle.", type: "likert", negative: true },
  { id: "rc3", label: "I feel closed off to learning healthier ways to cope.", type: "likert", negative: true },
  { id: "rc4", label: "I don't really believe I deserve support.", type: "likert", negative: true },
  { id: "rc5", label: "I am afraid to practice sharing my feelings with others.", type: "likert", negative: true },
  { id: "rc6", label: "I doubt that real change is possible for me.", type: "likert", negative: true },
  { id: "rc7", label: "I feel uncomfortable challenging silence in my family or community.", type: "likert", negative: true },
  { id: "rc8", label: "The idea of professional help makes me anxious or resistant.", type: "likert", negative: true },
  { id: "rc9", label: "I don't feel hopeful about building safer relationships.", type: "likert", negative: true },
  { id: "rc10", label: "I often avoid trying to understand why I delay asking for help.", type: "likert", negative: true },
];

const finalQuestions = [
  {
    id: "consent_use_results",
    label: "Will you be comfortable with us using your results for our research?",
    type: "yesno",
  },
  {
    id: "anything_else",
    label: "Would you like to share anything else?",
    type: "textarea",
    required: false,
  },
];

const initialQuestions = [
  ...demographicsQuestions,
  ...familyQuestions,
  ...healthQuestions,
  ...socialQuestions,
  ...personalityQuestions,
];

const allFollowUpQuestions = [
  ...earlyChildhoodQuestions,
  ...childhoodSocialQuestions,
  ...familyDynamicsQuestions,
  ...recoveryQuestions,
  ...supportSystemsQuestions,
  ...readinessQuestions,
];

const likertScale = [
  { value: 4, label: "Strongly Agree" },
  { value: 3, label: "Agree" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly Disagree" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const calculateShameScore = (responses) => {
  let shameScore = 0;

  if (responses.long_stress_periods === "yes") shameScore += 2;
  if (responses.overwhelming_emotions === "yes") shameScore += 2;
  
  if (responses.childhood_environment === "Unstable") shameScore += 2;
  if (responses.childhood_environment === "Chaotic") shameScore += 3;
  if (responses.childhood_environment === "Neutral") shameScore += 1;
  
  if (responses.usual_reaction === "Hide it") shameScore += 2;
  if (responses.usual_reaction === "Try to fix it alone") shameScore += 1;
  
  const positiveQuestions = [
    "adults_emotionally_available",
    "comfortable_asking_help",
    "comfortable_expressing_feelings",
    "school_encouraged_help",
    "feel_supported_today",
    "rely_on_support",
    "comfortable_vulnerability",
  ];
  
  positiveQuestions.forEach(id => {
    if (responses[id]) {
      const value = parseInt(responses[id]);
      if (value === 1) shameScore += 2;
      else if (value === 2) shameScore += 1;
    }
  });
  
  const negativeQuestions = [
    "judged_for_mistakes",
    "ashamed_needing_help",
  ];
  
  negativeQuestions.forEach(id => {
    if (responses[id]) {
      const value = parseInt(responses[id]);
      if (value === 4) shameScore += 2;
      else if (value === 3) shameScore += 1;
    }
  });
  
  if (responses.personality_type === "Introverted") shameScore += 1;
  
  if (responses.close_friends_count === "0") shameScore += 2;
  if (responses.close_friends_count === "1-2") shameScore += 1;
  
  return shameScore;
};

const getAdaptiveQuestions = (responses) => {
  const shameScore = calculateShameScore(responses);
  const shuffled = shuffleArray(allFollowUpQuestions);
  let questionsToShow;
  
  if (shameScore >= 10) {
    questionsToShow = 35;
  } else if (shameScore >= 7) {
    questionsToShow = 28;
  } else if (shameScore >= 4) {
    questionsToShow = 20;
  } else if (shameScore >= 2) {
    questionsToShow = 15;
  } else {
    questionsToShow = 10;
  }
  
  return shuffled.slice(0, questionsToShow);
};

export default function App() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [adaptiveQuestions, setAdaptiveQuestions] = useState([]);
  const [otherValues, setOtherValues] = useState({});

  const questionsPerPage = 6;

  const getCurrentQuestionSet = () => {
    if (phase === "intro") {
      return [];
    } else if (phase === "initial") {
      return initialQuestions;
    } else if (phase === "followup") {
      return adaptiveQuestions;
    } else {
      return finalQuestions;
    }
  };

  const currentQuestionSet = getCurrentQuestionSet();
  const totalPages = phase === "intro" ? 1 : Math.ceil(currentQuestionSet.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = currentQuestionSet.slice(startIndex, endIndex);

  const handleChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleOtherChange = (id, value) => {
    setOtherValues(prev => ({ ...prev, [id]: value }));
  };

  const handleNextPage = () => {
    if (phase === "intro") {
      const consent = responses["consent_participate"];
      if (!consent) {
        alert("Please indicate whether you agree to participate before continuing.");
        return;
      }
      if (consent === "disagree") {
        alert("You have declined to participate. Thank you for your interest.");
        return;
      }
      setPhase("initial");
      setCurrentPage(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (phase === "initial") {
      const adaptive = getAdaptiveQuestions(responses);
      setAdaptiveQuestions(adaptive);
      setPhase("followup");
      setCurrentPage(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (phase === "followup") {
      setPhase("final");
      setCurrentPage(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const finalResponses = { ...responses };
    Object.keys(otherValues).forEach(key => {
      if (finalResponses[key] === "Other") {
        finalResponses[key + "_other"] = otherValues[key];
      }
    });

    const scores = calculateScores(finalResponses);
    
    try {
      await saveToGoogleSheets({
        ...finalResponses,
        scores: scores,
        questionsAnswered: Object.keys(finalResponses).length,
        adaptiveQuestionsCount: adaptiveQuestions.length,
        timestamp: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      const existingData = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
      existingData.push({
        ...finalResponses,
        scores: scores,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('surveyResponses', JSON.stringify(existingData));
      setSubmitted(true);
    }
  };

  const calculateScores = (responses) => {
    const sectionScores = {};
    
    const ecIds = earlyChildhoodQuestions.map(q => q.id);
    const ecScores = ecIds.map(id => parseInt(responses[id]) || 0).filter(v => v > 0);
    sectionScores.earlyChildhood = ecScores.length > 0 
      ? (ecScores.reduce((a, b) => a + b, 0) / ecScores.length).toFixed(2)
      : null;

    const csIds = childhoodSocialQuestions.map(q => q.id);
    const csScores = csIds.map(id => parseInt(responses[id]) || 0).filter(v => v > 0);
    sectionScores.childhoodSocial = csScores.length > 0
      ? (csScores.reduce((a, b) => a + b, 0) / csScores.length).toFixed(2)
      : null;

    const fdIds = familyDynamicsQuestions.map(q => q.id);
    const fdScores = fdIds.map(id => parseInt(responses[id]) || 0).filter(v => v > 0);
    sectionScores.familyDynamics = fdScores.length > 0
      ? (fdScores.reduce((a, b) => a + b, 0) / fdScores.length).toFixed(2)
      : null;

    const rgIds = recoveryQuestions.map(q => q.id);
    const rgScores = rgIds.map(id => parseInt(responses[id]) || 0).filter(v => v > 0);
    sectionScores.recovery = rgScores.length > 0
      ? (rgScores.reduce((a, b) => a + b, 0) / rgScores.length).toFixed(2)
      : null;

    const ssIds = supportSystemsQuestions.map(q => q.id);
    const ssScores = ssIds.map(id => parseInt(responses[id]) || 0).filter(v => v > 0);
    sectionScores.supportSystems = ssScores.length > 0
      ? (ssScores.reduce((a, b) => a + b, 0) / ssScores.length).toFixed(2)
      : null;

    const rcIds = readinessQuestions.map(q => q.id);
    const rcScores = rcIds.map(id => parseInt(responses[id]) || 0).filter(v => v > 0);
    sectionScores.readiness = rcScores.length > 0
      ? (rcScores.reduce((a, b) => a + b, 0) / rcScores.length).toFixed(2)
      : null;

    const allScores = [...ecScores, ...csScores, ...fdScores, ...rgScores, ...ssScores, ...rcScores];
    const overallAverage = allScores.length > 0
      ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2)
      : null;

    return {
      sections: sectionScores,
      overallAverage,
      shameScoreFromInitial: calculateShameScore(responses),
    };
  };

  const saveToGoogleSheets = async (data) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwRFXzpXL19qFTeqHOAeyC_INB5qWTUy5QEuz-wz6nwyPmyJVckDvwYUpoc0ZHJkX8w5Q/exec';
    
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response;
  };

  const renderQuestion = (q) => {
    if (q.type === "select") {
      return (
        <div className="space-y-2">
          <select
            className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-indigo-500 focus:outline-none transition-colors bg-white"
            onChange={(e) => handleChange(q.id, e.target.value)}
            value={responses[q.id] || ""}
          >
            <option value="">Select an option</option>
            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {q.hasOther && responses[q.id] === "Other" && (
            <input
              type="text"
              className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-indigo-500 focus:outline-none transition-colors mt-2"
              placeholder="Please specify..."
              onChange={(e) => handleOtherChange(q.id, e.target.value)}
              value={otherValues[q.id] || ""}
            />
          )}
        </div>
      );
    } else if (q.type === "yesno") {
      return (
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <label 
              key={option} 
              className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                responses[q.id] === option.toLowerCase()
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={q.id}
                value={option.toLowerCase()}
                checked={responses[q.id] === option.toLowerCase()}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="sr-only"
              />
              <span className="font-medium">{option}</span>
            </label>
          ))}
        </div>
      );
    } else if (q.type === "likert") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {likertScale.map((option) => (
            <label 
              key={option.value} 
              className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                responses[q.id] == option.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={q.id}
                value={option.value}
                checked={responses[q.id] == option.value}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      );
    } else if (q.type === "textarea") {
      return (
        <textarea
          className="border-2 border-slate-200 rounded-xl p-4 w-full focus:border-indigo-500 focus:outline-none transition-colors resize-none h-32"
          placeholder="Share your thoughts here... (optional)"
          onChange={(e) => handleChange(q.id, e.target.value)}
          value={responses[q.id] || ""}
        />
      );
    } else if (q.type === "number") {
      return (
        <input
          type="number"
          className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-indigo-500 focus:outline-none transition-colors"
          onChange={(e) => handleChange(q.id, e.target.value)}
          value={responses[q.id] || ""}
          min={q.id === "age" ? 13 : undefined}
          max={q.id === "age" ? 120 : undefined}
        />
      );
    } else {
      return (
        <input
          type={q.type}
          className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-indigo-500 focus:outline-none transition-colors"
          onChange={(e) => handleChange(q.id, e.target.value)}
          value={responses[q.id] || ""}
        />
      );
    }
  };

  const getSectionName = () => {
    if (phase === "intro") return "Study Information";
    if (phase === "initial") {
      const questionIndex = currentPage * questionsPerPage;
      if (questionIndex < 6) return "Demographics";
      if (questionIndex < 10) return "Family & Upbringing";
      if (questionIndex < 14) return "Health & Mental Health History";
      if (questionIndex < 19) return "Social & Environmental Factors";
      return "Personality & Coping";
    } else if (phase === "followup") {
      return "Your Personal Experiences";
    } else {
      return "Final Questions";
    }
  };
  
  const getPhaseLabel = () => {
    if (phase === "intro") return "Study Information & Consent";
    if (phase === "initial") return "Part 1: Background";
    if (phase === "followup") return "Part 2: Personal Experiences";
    return "Part 3: Final Questions";
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Debrief</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Thank you for participating in this study. If you have questions or want to learn more about the study, please contact ayahij2005@gmail.com
          </p>
        </div>
      </div>
    );
  }

  const totalQuestionsForProgress = phase === "initial" 
    ? initialQuestions.length + 20 + finalQuestions.length
    : initialQuestions.length + adaptiveQuestions.length + finalQuestions.length;
  
  const answeredQuestions = Object.keys(responses).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Help-Seeking & Emotional Safety Study
            </h1>
            <p className="text-slate-600">
              Understanding barriers to seeking support and building emotional safety
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span className="font-medium">{getSectionName()}</span>
              <span>{answeredQuestions} answered</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((answeredQuestions / totalQuestionsForProgress) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Page {currentPage + 1} of {totalPages}</span>
              <span>{getPhaseLabel()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {phase === "intro" ? (
              <>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-slate-700 text-base leading-relaxed">
                    This study is being conducted as part of a class project. Your name will not be collected. There are no serious risks in this study. If a question makes you uncomfortable, you may skip it.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <label className="font-medium text-slate-800 text-lg leading-relaxed block mb-4">
                    Do you understand the information above and agree to participate in this study?
                  </label>
                  <div className="flex gap-4">
                    {["I agree", "I do not agree"].map((option) => (
                      <label 
                        key={option} 
                        className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          responses["consent_participate"] === (option === "I agree" ? "agree" : "disagree")
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="consent_participate"
                          value={option === "I agree" ? "agree" : "disagree"}
                          checked={responses["consent_participate"] === (option === "I agree" ? "agree" : "disagree")}
                          onChange={(e) => handleChange("consent_participate", e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              currentQuestions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-100"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-sm font-bold">
                      {startIndex + index + 1}
                    </span>
                    <label className="font-medium text-slate-800 text-lg leading-relaxed pt-0.5">
                      {question.label}
                      {question.required === false && (
                        <span className="text-slate-400 text-sm font-normal ml-2">(optional)</span>
                      )}
                    </label>
                  </div>
                  {renderQuestion(question)}
                </div>
              ))
            )}
            
            <div className="pt-6 flex justify-between items-center">
              {(currentPage > 0 || (phase === "initial" && currentPage === 0)) && (
                <button
                  type="button"
                  onClick={() => {
                    if (phase === "initial" && currentPage === 0) {
                      setPhase("intro");
                    } else {
                      setCurrentPage(currentPage - 1);
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
                >
                  ← Previous
                </button>
              )}
              
              <div className="ml-auto">
                {phase === "final" && currentPage === totalPages - 1 ? (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 font-medium transition-all shadow-lg shadow-emerald-500/30"
                  >
                    Submit Survey ✓
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-lg shadow-indigo-500/30"
                  >
                    {phase === "initial" && currentPage === totalPages - 1 
                      ? "Continue to Part 2 →" 
                      : phase === "followup" && currentPage === totalPages - 1
                        ? "Continue to Final Questions →"
                        : "Next →"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          All responses are anonymous and confidential
        </p>
      </div>
    </div>
  );
}
