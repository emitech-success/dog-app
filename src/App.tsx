
import { QueryClient, QueryClientProvider } from 'react-query';
import DogBreedSelector from './component/DogBreedSelector';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center">
        <DogBreedSelector />
      </div>
    </QueryClientProvider>
  );
}

export default App;
