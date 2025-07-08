import  { useState, useEffect, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

interface ProjectFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
}

export function ProjectFilters({ onFiltersChange }: ProjectFiltersProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    "Technology",
    "Art & Design",
    "Games",
    "Film",
    "Music",
    "Publishing",
    "Food",
    "Fashion",
    "Health",
    "Education",
  ];

  const statuses = ["Active", "Funded", "Failed"];

  // Helper function to get display label from value
  const getDisplayLabel = (value: string, options: string[]): string => {
    const found = options.find(option => option.toLowerCase() === value.toLowerCase());
    return found || value;
  };

  // Update active filters when filter states change
  useEffect(() => {
    const filters: string[] = [];

    if (searchTerm.trim()) {
      filters.push(`Search: ${searchTerm.trim()}`);
    }

    if (selectedCategory) {
      const categoryLabel = getDisplayLabel(selectedCategory, categories);
      filters.push(categoryLabel);
    }

    if (selectedStatus) {
      const statusLabel = getDisplayLabel(selectedStatus, statuses);
      filters.push(statusLabel);
    }

    setActiveFilters(filters);

    // Notify parent component of filter changes
    if (onFiltersChange) {
      onFiltersChange({
        searchTerm,
        selectedCategory,
        selectedStatus,
      });
    }
  }, [searchTerm, selectedCategory, selectedStatus, onFiltersChange]);

  const clearFilters = (): void => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedStatus("");
    setActiveFilters([]);
  };

  const removeFilter = (filterToRemove: string): void => {
    // Handle search filter removal
    if (filterToRemove.startsWith("Search: ")) {
      setSearchTerm("");
      return;
    }

    // Handle category filter removal
    const categoryMatch = categories.find(cat => cat === filterToRemove);
    if (categoryMatch) {
      setSelectedCategory("");
      return;
    }

    // Handle status filter removal
    const statusMatch = statuses.find(status => status === filterToRemove);
    if (statusMatch) {
      setSelectedStatus("");
      return;
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status.toLowerCase()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={clearFilters}>
          <Filter className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X
                className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors"
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectFilters;
