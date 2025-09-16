import { useState, useEffect } from "react";

// Section A - Demographics (5 questions - always first)
const sectionA = [
  { id: "age", label: "How old are you?", type: "number" },
  {
    id: "gender",
    label: "What gender are you?",
    type: "select",
    options: ["male", "female", "other"],
  },
  { id: "major", label: "What is your major?", type: "text" },
  { id: "gpa", label: "What is your current GPA?", type: "number", step: "0.01" },
  {
    id: "livingWithParents",
    label: "Are you currently living with your parents?",
    type: "select",
    options: ["yes", "no"],
  },
];

// Section B - Sector Questions (6 questions - determine profile)
const sectorQuestions = [
  {
    id: "family_influence",
    label: "My family's expectations heavily influenced my academic choices.",
    type: "likert",
  },
  {
    id: "academic_pressure",
    label: "I feel academic pressure on a daily basis.",
    type: "likert",
  },
  {
    id: "social_support",
    label: "I feel supported by my friends and social circle.",
    type: "likert",
  },
  {
    id: "financial_stress",
    label: "Financial concerns affect my daily life.",
    type: "likert",
  },
  {
    id: "personal_confidence",
    label: "I feel confident about achieving my future goals.",
    type: "likert",
  },
  {
    id: "stress_management",
    label: "I handle stress and challenges well.",
    type: "likert",
  },
];

// Section C - Main Questions (25 questions - strategically selected for maximum research value)
const mainQuestions = [
  // Parenting Style 
  { id: "p1", label: "My parents explained why they made rules.", type: "likert", category: "authoritative" },
  { id: "p2", label: "My parents balanced rules with kindness.", type: "likert", category: "authoritative" },
  { id: "p3", label: "My parents expected me to obey without asking questions.", type: "likert", category: "authoritarian" },
  { id: "p4", label: "My parents often said 'Do it because I said so.'", type: "likert", category: "authoritarian" },
  { id: "p5", label: "My parents let me do almost anything I wanted.", type: "likert", category: "permissive" },
  { id: "p6", label: "My parents rarely said 'no' to me.", type: "likert", category: "permissive" },
  { id: "p7", label: "My parents seemed like they didn't care what I did.", type: "likert", category: "uninvolved" },
  { id: "p8", label: "With my parents, I often felt alone at home (Emotionally).", type: "likert", category: "uninvolved" },
  
  // Self-Esteem & Identity 
  { id: "se1", label: "I feel proud of myself most of the time.", type: "likert", category: "selfesteem" },
  { id: "se2", label: "I feel confident trying new activities.", type: "likert", category: "selfesteem" },
  { id: "se3", label: "I feel comfortable making decisions on my own.", type: "likert", category: "selfesteem" },
  { id: "se4", label: "I believe I can reach my goals.", type: "likert", category: "selfesteem" },
  { id: "se5", label: "I feel accepted by family and friends.", type: "likert", category: "selfesteem" },
  { id: "se6", label: "I sometimes doubt my abilities.", type: "likert", category: "selfesteem", reverse: true },
  { id: "se7", label: "I feel secure about my future.", type: "likert", category: "selfesteem" },
  { id: "se8", label: "I feel happy with who I am.", type: "likert", category: "selfesteem" },
  { id: "se9", label: "I feel like my life has purpose.", type: "likert", category: "selfesteem" },
  
  // Social Learning & Coping
  { id: "sl1", label: "I learn by watching how others solve problems.", type: "likert", category: "social_learning" },
  { id: "sl2", label: "I believe failure is a chance to learn.", type: "likert", category: "social_learning" },
  { id: "sl3", label: "I try to copy positive ways people deal with challenges.", type: "likert", category: "social_learning" },
  { id: "sl4", label: "I believe effort matters more than luck.", type: "likert", category: "social_learning" },
  { id: "sl5", label: "I stay calm when I see others staying calm in tough situations.", type: "likert", category: "social_learning" },
  { id: "sl6", label: "I feel capable of improving my skills with practice.", type: "likert", category: "social_learning" },
  { id: "sl7", label: "I keep trying until I succeed.", type: "likert", category: "social_learning" },
  { id: "sl8", label: "I believe I can succeed even after failing.", type: "likert", category: "social_learning" },
];

// Section D - Final Assessment Questions (includes FRQ)
const finalQuestions = [
  {
    id: "stress_scale",
    label: "On a scale from 1-10, how stressed are you currently?",
    type: "likert",
    scale: "stress10",
  },
  {
    id: "confidence_scale", 
    label: "On a scale from 1-10, how confident are you with your choices?",
    type: "likert",
    scale: "confidence10",
  },
  {
    id: "self_esteem_perception",
    label: "Do you believe you have low or high self-esteem?",
    type: "select",
    options: ["low", "high"],
  },
  {
    id: "frq_response",
    label: "In what ways do you think your family's expectations influenced your academic choices or stress levels?",
    type: "textarea",
  },
];

// Section E - Consent Question (1 question)
const consentQuestions = [
  {
    id: "consent",
    label: "Do you give permission for your anonymous responses to be quoted in our research paper or presentation?",
    type: "select",
    options: ["yes", "no"],
  },
];

// Likert scale options
const likertScales = {
  standard: [
    { value: 1, label: "Strongly disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neither" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly agree" },
  ],
  stress10: [
    { value: 1, label: "1 - Not stressed at all" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10 - Extremely stressed" },
  ],
  confidence10: [
    { value: 1, label: "1 - Not confident at all" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10 - Extremely confident" },
  ],
};

// Function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [randomizedMainQuestions, setRandomizedMainQuestions] = useState([]);

  // Initialize randomized main questions on mount
  useEffect(() => {
    setRandomizedMainQuestions(shuffleArray(mainQuestions));
  }, []);

  // Survey structure - total questions calculated dynamically
  const allQuestions = [
    ...sectionA,                    // 5 questions
    ...sectorQuestions,             // 6 questions  
    ...randomizedMainQuestions,     // 25 questions
    ...finalQuestions,              // final section (incl. FRQ)
    ...consentQuestions            // 1 question
  ];

  // Organize into pages of 6 questions each
  const questionsPerPage = 6;
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);

  const handleChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate final scores for research analysis
    const scores = calculateScores(responses);
    
    // Save to Google Sheets
    try {
      await saveToGoogleSheets({
        ...responses,
        scores: scores,
        timestamp: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      // Fallback: save to localStorage
      const existingData = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
      existingData.push({
        ...responses,
        scores: scores,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('surveyResponses', JSON.stringify(existingData));
      setSubmitted(true);
    }
  };

  const calculateScores = (responses) => {
    // Parenting Style Scores
    const authoritative = ['p1', 'p2'].reduce((sum, id) => sum + (parseInt(responses[id]) || 0), 0) / 2;
    const authoritarian = ['p3', 'p4'].reduce((sum, id) => sum + (parseInt(responses[id]) || 0), 0) / 2;
    const permissive = ['p5', 'p6'].reduce((sum, id) => sum + (parseInt(responses[id]) || 0), 0) / 2;
    const uninvolved = ['p7', 'p8'].reduce((sum, id) => sum + (parseInt(responses[id]) || 0), 0) / 2;
    
    // Self-Esteem Score (reverse code se6)
    const selfEsteemIds = ['se1', 'se2', 'se3', 'se4', 'se5', 'se7', 'se8', 'se9'];
    const selfEsteem = selfEsteemIds.reduce((sum, id) => sum + (parseInt(responses[id]) || 0), 0) / selfEsteemIds.length;
    const selfEsteemReverse = responses.se6 ? (6 - parseInt(responses.se6)) : 0; // Reverse code se6
    const finalSelfEsteem = (selfEsteem * selfEsteemIds.length + selfEsteemReverse) / (selfEsteemIds.length + 1);
    
    // Social Learning Score
    const socialLearningIds = ['sl1', 'sl2', 'sl3', 'sl4', 'sl5', 'sl6', 'sl7', 'sl8'];
    const socialLearning = socialLearningIds.reduce((sum, id) => sum + (parseInt(responses[id]) || 0), 0) / socialLearningIds.length;
    
    // Determine dominant parenting style with tie handling and margin threshold
    const parentingScores = { authoritative, authoritarian, permissive, uninvolved };
    const scoresArray = Object.entries(parentingScores);
    const maxValue = Math.max(...scoresArray.map(([, v]) => v));
    const topKeys = scoresArray.filter(([, v]) => v === maxValue).map(([k]) => k);

    // margin required above the second-highest to be considered dominant
    const dominanceMargin = 0.2;
    const sortedValuesDesc = scoresArray.map(([, v]) => v).sort((a, b) => b - a);
    const secondValue = sortedValuesDesc[1] ?? 0;
    const hasClearMargin = (maxValue - secondValue) >= dominanceMargin;

    const dominantParenting = (topKeys.length === 1 && hasClearMargin) ? topKeys[0] : 'mixed';

    return {
      parenting: {
        authoritative,
        authoritarian, 
        permissive,
        uninvolved,
        dominant: dominantParenting
      },
      selfEsteem: finalSelfEsteem,
      socialLearning: socialLearning,
      stressLevel: parseInt(responses.stress_scale) || 0,
      confidenceLevel: parseInt(responses.confidence_scale) || 0,
      selfEsteemPerception: responses.self_esteem_perception || 'unknown'
    };
  };

  const saveToGoogleSheets = async (data) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzNHcGW-5WvT6OflN4_1_ZqrunvZssR7mQKBcLj-P1tovNxMyvjXo4qrgfYgi-_eMjPtA/exec';
    
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
        <select
          className="border rounded-lg p-2 w-full"
          onChange={(e) => handleChange(q.id, e.target.value)}
          value={responses[q.id] || ""}
          required
        >
          <option value="">Select an option</option>
          {q.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    } else if (q.type === "likert") {
      const scale = likertScales[q.scale] || likertScales.standard;
      return (
        <div className="space-y-2">
          {scale.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <input
                type="radio"
                name={q.id}
                value={option.value}
                checked={responses[q.id] == option.value}
                onChange={(e) => handleChange(q.id, e.target.value)}
                required
                className="text-blue-600"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      );
    } else if (q.type === "textarea") {
      return (
        <textarea
          className="border rounded-lg p-3 w-full h-24 resize-none"
          placeholder="Please share your thoughts (1-3 sentences)..."
          onChange={(e) => handleChange(q.id, e.target.value)}
          value={responses[q.id] || ""}
          required
        />
      );
    } else {
      return (
        <input
          type={q.type}
          className="border rounded-lg p-2 w-full"
          step={q.step || undefined}
          onChange={(e) => handleChange(q.id, e.target.value)}
          value={responses[q.id] || ""}
          required
        />
      );
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-4 text-green-600">
            Thank You!
          </h1>
          <p className="text-gray-600 text-lg">
            Your responses have been recorded. We appreciate your participation in this research study on parenting styles and academic outcomes.
          </p>
        </div>
      </div>
    );
  }

  // Get section name based on current questions
  const getSectionName = () => {
    if (currentPage === 0) return "Demographics";
    if (currentPage === 1) return "Key Areas";
    if (currentPage === Math.ceil(allQuestions.length / questionsPerPage) - 1) return "Final Questions";
    return "Core Psychology Questions";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Parenting Styles & Academic Outcomes Research Study
          </h1>
          <p className="text-gray-600 text-center mb-2">
            This survey explores how parenting styles influence self-esteem, stress management, and academic performance.
          </p>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Based on research by Diana Baumrind (Parenting Styles), Erik Erikson (Identity Development), and Albert Bandura (Social Learning Theory)
          </p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Object.keys(responses).length} / {allQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(responses).length / allQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Show current section name */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Page {currentPage + 1} of {totalPages}: {getSectionName()}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {startIndex + index + 1}
                  </span>
                  <label className="font-medium text-gray-900 text-lg leading-relaxed">
                    {question.label}
                  </label>
                </div>
                {renderQuestion(question)}
              </div>
            ))}
            
            <div className="pt-6 flex justify-between">
              {currentPage > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    // Scroll to top of page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentPage < totalPages - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      // Check if current page is completed
                      const currentPageQuestions = currentQuestions.map(q => q.id);
                      const completedQuestions = currentPageQuestions.filter(id => responses[id]).length;
                      
                      if (completedQuestions === currentPageQuestions.length) {
                        setCurrentPage(currentPage + 1);
                        // Scroll to top of page
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        alert('Please complete all questions before continuing.');
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next Page
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Submit Survey
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}