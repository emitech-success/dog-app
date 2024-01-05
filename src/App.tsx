// import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import DogBreedSelector from './component/DogBreedSelector';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center">
        <DogBreedSelector />
      </div>
    </QueryClientProvider>
  );
}

export default App;
