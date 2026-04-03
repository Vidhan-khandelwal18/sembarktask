import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

const queryClient = new QueryClient();

class App extends React.Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen font-sans">
              <Navbar />
              <div className="flex-1">
                <Switch>
                  <Route exact path="/" render={(props) => <HomePage {...props} />} />
                  <Route path="/product/:id/details" render={(props) => <ProductDetailPage {...props} />} />
                  <Route path="/cart" render={(props) => <CartPage {...props} />} />
                </Switch>
              </div>
              <Footer />
            </div>
            <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
          </Router>
        </CartProvider>
      </QueryClientProvider>
    );
  }
}

export default App;
