import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign, Tag, ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-900 to-black p-6">
      <div className="max-w-6xl mx-auto mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 shadow-xl">
          <div className="text-white mb-6 md:mb-0">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Budget Management
            </h2>
            <p className="text-zinc-400 mt-2">
              Create and manage your team's financial allocations with ease
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full px-6 shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center gap-2 font-medium">
                <Plus className="h-4 w-4" />
                Create Budget
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow-2xl">
              <DialogHeader className="border-b border-zinc-800 pb-4">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                  Create New Budget
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Set up a new budget allocation for your team
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-zinc-300 font-medium">
                    Budget Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="e.g. Q2 Marketing Campaign"
                      className="bg-zinc-800/50 border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/30 text-white pl-10 h-12 rounded-lg"
                    />
                    <Tag className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="amount" className="text-zinc-300 font-medium">
                    Budget Amount
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="e.g. 10000"
                      className="bg-zinc-800/50 border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/30 text-white pl-10 h-12 rounded-lg"
                    />
                    <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label className="text-zinc-300 font-medium">
                    Categories
                  </Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-full bg-zinc-800/50 border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/30 text-white h-12 rounded-lg">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      size="icon"
                      className="h-12 w-12 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
                    >
                      <Plus className="h-5 w-5 text-emerald-500" />
                    </Button>
                  </div>

                  {/* Sample selected categories */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-zinc-800/80 border border-zinc-700 rounded-full px-3 py-1.5">
                      <span className="text-zinc-300 text-sm">Marketing</span>
                    </div>
                    <div className="flex items-center gap-1 bg-zinc-800/80 border border-zinc-700 rounded-full px-3 py-1.5">
                      <span className="text-zinc-300 text-sm">Development</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex space-x-2 border-t border-zinc-800 pt-4">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-lg px-4">
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg px-6 shadow-lg shadow-emerald-500/20 transition-all duration-300">
                  Create Budget
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sample budget cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Sample Budget Card */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">Marketing Q1</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  3 categories • Updated 2 days ago
                </p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 font-medium rounded-full px-3 py-1 text-sm">
                Active
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm text-zinc-400 mb-2">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-zinc-400">Budget</p>
                <p className="text-2xl font-bold text-white">$24,000</p>
              </div>

              <Button className="rounded-full p-2 bg-zinc-800 hover:bg-zinc-700 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* You can duplicate the card above for more examples */}
        </div>
      </div>
    </section>
  );
};

export default Page;
