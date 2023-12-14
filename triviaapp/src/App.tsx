import { useEffect } from 'react';
import { QuizQuestionReady, useTrivia } from './components/TriviaHook';

function App() {
  const {  
    fetchQuestions, 
    loading, 
    currQ,  
    nextQuestion,
    selectAnswer,
    questions,
    textLeft
  } = useTrivia();
  
  useEffect(() => {
    if (questions.length === 0) {
      fetchQuestions();
    }
  }, [fetchQuestions, questions.length]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className='p-4 h-screen grid place-items-center grid-rows-[1fr,50px]'>
      {!loading && currQ && (
        <QuizContent currQ={currQ} selectAnswer={selectAnswer} />
      )}
      <button onClick={nextQuestion} className='px-6 py-2 bg-sky-950 shadow-md shadow-sky-800 rounded-full text-sky-50'>
        {textLeft}
      </button>
    </main>
  );
}

interface QuizContentProps {
  currQ: QuizQuestionReady;
  selectAnswer: (currQ: QuizQuestionReady, index: number) => void;
}

const QuizContent = (props: QuizContentProps) => (
  <div className='lg:w-[700px] md:w-[450px] h-[350px] grid md:grid-cols-2 md:grid-rows-[200px] gap-2'>
    <div className='md:col-span-2 pb-5'>
      <h1 className='text-3xl font-bold text-sky-700'>{decodeHtml(props.currQ.question)}</h1>
    </div>
    {props.currQ.order.map((answer, index) => (
      <div key={index} className={`col-span-1 ${props.currQ.checked === index ? 'bg-green-700' : 'bg-sky-50'}`}>
        <button onClick={() => props.selectAnswer(props.currQ, index)} className='p-3 grid gap-2 grid-cols-[20px,1fr] place-items-start text-sky-900'>
          <span>{index + 1}.</span><span>{answer}</span>
        </button>
      </div>
    ))}
  </div>
);

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default App;


