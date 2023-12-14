import { useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface QuizResponse {
    response_code: number;
    results: QuizQuestion[];
  }
  
  interface QuizQuestion {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  type NotChceked = -1;
  export interface QuizQuestionReady extends QuizQuestion {
    order: string[];
    checked: number | NotChceked;
  }
  
  export const getTenQ = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=10');
    if (!res.ok) return; // TODO: handle error
    const users = await res.json();
    return users;
  }
  
  export const genrateTextRangeForNextBtn = (range: {start: number, stop: number, answered: number}) => {
    return `Next Question: ${range.start + 1} - ${range.stop}, Answered: ${range.answered}`
  }
  export const useTrivia = () => {
    const [questions, setQuestions] = useState<QuizQuestionReady[]>([]);
    const [currQ, setCurrQ] = useState<QuizQuestionReady>();
    const [loading, setLoading] = useState(false);
    const [textLeft, setTextLeft] = useState('');
  
    const fetchQuestions = useCallback(async () => {
      setLoading(true);
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=10');
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json() as QuizResponse;
        const shuffledQuestions = shuffleQuestions(data.results);
        setQuestions(shuffledQuestions);
        setCurrQ(shuffledQuestions[0]);
        setTextLeft(genrateTextRangeForNextBtn({start: 0, stop: 10, answered: 0}));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    const nextQuestion = useCallback(() => {
      setCurrQ(prev => {
        const nextIndex = questions.findIndex(q => q.question === prev?.question) + 1;
        return questions[nextIndex % questions.length];
      });
      setTextLeft(genrateTextRangeForNextBtn({
        start: questions.findIndex(q => q.question === currQ?.question) + 1,
        stop: questions.length,
        answered: questions.filter(q => q.checked !== -1).length
    }));
    }, [questions, currQ]);
  
    const selectAnswer = useCallback((question: QuizQuestionReady, answerIndex: number) => {
      setQuestions(prevQuestions =>
        prevQuestions.map(q =>
          q.question === question.question
            ? { ...q, checked: answerIndex }
            : q
        )
      );
      nextQuestion();
      
    }, [nextQuestion]);
  
    return { 
      questions, 
      fetchQuestions, 
      loading, 
      currQ, 
      nextQuestion,
      selectAnswer,
      textLeft
    };
  }
  
  const shuffleQuestions = (questions: QuizQuestion[]) => {
    return questions.map(q => ({
      ...q,
      order: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      checked: -1
    }));
  }
  
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const fetched = {
    "response_code": 0,
    "results": [
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "Entertainment: Video Games",
            "question": "Which game in the &quot;Monster Hunter&quot; series introduced the &quot;Insect Glaive&quot; weapon?",
            "correct_answer": "Monster Hunter 4",
            "incorrect_answers": [
                "Monster Hunter Freedom",
                "Monster Hunter Stories",
                "Monster Hunter 2"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Cartoon &amp; Animations",
            "question": "Which &#039;Family Guy&#039; character got his own spin-off show in 2009?",
            "correct_answer": "Cleveland Brown",
            "incorrect_answers": [
                "Glenn Quagmire",
                "Joe Swanson",
                "The Greased-up Deaf Guy"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "Entertainment: Video Games",
            "question": "What is the real name of &quot;Warhead&quot; in the Sega Genesis game &quot;Vectorman&quot;?",
            "correct_answer": "Raster",
            "incorrect_answers": [
                "Peacehead",
                "Vectorkid",
                "Bitmap"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Music",
            "question": "Who is the lead singer of Green Day?",
            "correct_answer": "Billie Joe Armstrong",
            "incorrect_answers": [
                "Mike Dirnt",
                "Sean Hughes",
                "Tr&eacute; Cool"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Video Games",
            "question": "In the &quot;Pikmin&quot; series, what is the only pikmin type to possess visible ears?",
            "correct_answer": "Yellow",
            "incorrect_answers": [
                "Red",
                "White",
                "Winged"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Board Games",
            "question": "In Chess, the Queen has the combined movement of which two pieces?",
            "correct_answer": "Bishop and Rook",
            "incorrect_answers": [
                "Rook and King",
                "Knight and Bishop",
                "King and Knight"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "Entertainment: Film",
            "question": "Which was the first of Alfred Hitchcock&#039;s movies to be filmed in colour?",
            "correct_answer": "Rope",
            "incorrect_answers": [
                "Psycho",
                "Vertigo",
                "Rebecca"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Geography",
            "question": "Which Russian oblast forms a border with Poland?",
            "correct_answer": "Kaliningrad",
            "incorrect_answers": [
                "Samara",
                "Nizhny Novgorod",
                "Omsk"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "History",
            "question": "When did the French Revolution begin?",
            "correct_answer": "1789",
            "incorrect_answers": [
                "1823",
                "1756",
                "1799"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "Which figure from Greek mythology traveled to the underworld to return his wife Eurydice to the land of the living?",
            "correct_answer": "Orpheus",
            "incorrect_answers": [
                "Hercules",
                "Perseus",
                "Daedalus"
            ]
        }
    ]
  };