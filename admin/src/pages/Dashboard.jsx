import { useTheme } from '../components/theme-provider';  // Adjust the path
import { Link } from "react-router-dom";
import { ShoppingBag, Package, Layers, Users, PlusCircle, Moon, Sun } from "lucide-react";
import { Overview } from "../components/Overview.jsx";
import { RecentSales } from "../components/RecentSales.jsx";

export default function Dashboard() {
  const { theme, setTheme } = useTheme(); // Get current theme and setTheme from ThemeProvider

  // Toggle the theme between 'light' and 'dark'
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);  // Update the theme
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Dark mode toggle */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
          >
            <span className="sr-only">Toggle dark mode</span>
            <span
              className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
          <Moon className="h-4 w-4" />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link
          to="/dashboard/products/new"
          className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-primary-100 dark:text-primary-900 dark:hover:bg-primary-200"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg border border-gray-200 bg-card p-6 shadow-sm dark:border-gray-800 dark:bg-card-dark">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</h3>
            <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="text-2xl font-bold">254</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+12 from last month</p>
        </div>

        {/* Add other stat cards as needed */}
      </div>

      {/* Charts and Recent Sales */}
      <div className="grid gap-4 md:grid-cols-7 mb-8">
        <div className="md:col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-medium">Overview</h3>
          </div>
          <div className="pl-2 pr-6 pb-6">
            <Overview />
          </div>
        </div>

        <div className="md:col-span-3 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-medium">Recent Sales</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">You made 265 sales this month.</p>
          </div>
          <div className="p-6 pt-0">
            <RecentSales />
          </div>
        </div>
      </div>
    </div>
  );
}