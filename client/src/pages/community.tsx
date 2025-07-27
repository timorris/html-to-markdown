import { ArrowLeftRight, Github, Users, MessageCircle, Heart, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface GitHubActivity {
  type: string;
  actor: string;
  action: string;
  description: string;
  timeAgo: string;
  color: string;
}

interface GitHubActivityResponse {
  activities: GitHubActivity[];
}

interface GitHubStats {
  stars: number;
  contributors: number;
  releases: number;
}

interface GitHubStatsResponse {
  stats: GitHubStats | null;
}

export default function Community() {
  // Fetch GitHub activity data
  const { data: activityData, isLoading, error } = useQuery<GitHubActivityResponse>({
    queryKey: ['/api/github/activity'],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2
  });

  // Fetch GitHub repository stats
  const { data: statsData, isLoading: statsLoading } = useQuery<GitHubStatsResponse>({
    queryKey: ['/api/github/stats'],
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 2
  });

  const activities = activityData?.activities || [];
  const stats = statsData?.stats;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/support" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeftRight className="h-6 w-6" />
              <span className="font-semibold">Back to Support</span>
            </Link>
          </div>

          {/* Community Content */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Join Our Community</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Connect with other developers, share tips, contribute to the project, and stay updated with the latest developments.
              </p>
            </div>

            {/* GitHub Repository */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Github className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold">Open Source Repository</h2>
                </div>
                <p className="text-slate-400 mb-4">
                  The HTML ↔ Markdown Converter is open source! Contribute to the project, report issues, or explore the code.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {statsLoading ? (
                    <>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center animate-pulse">
                        <div className="h-8 bg-slate-600 rounded mb-2"></div>
                        <div className="h-4 bg-slate-700 rounded w-16 mx-auto"></div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center animate-pulse">
                        <div className="h-8 bg-slate-600 rounded mb-2"></div>
                        <div className="h-4 bg-slate-700 rounded w-20 mx-auto"></div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center animate-pulse">
                        <div className="h-8 bg-slate-600 rounded mb-2"></div>
                        <div className="h-4 bg-slate-700 rounded w-16 mx-auto"></div>
                      </div>
                    </>
                  ) : stats ? (
                    <>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-400">{stats.stars}</div>
                        <div className="text-sm text-slate-400">Stars</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-400">{stats.contributors}</div>
                        <div className="text-sm text-slate-400">Contributors</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-400">{stats.releases}</div>
                        <div className="text-sm text-slate-400">Releases</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-slate-500">-</div>
                        <div className="text-sm text-slate-400">Stars</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-slate-500">-</div>
                        <div className="text-sm text-slate-400">Contributors</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-slate-500">-</div>
                        <div className="text-sm text-slate-400">Releases</div>
                      </div>
                    </>
                  )}
                </div>
                <a 
                  href="https://github.com/timorris/html-to-markdown" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>

            {/* Ways to Contribute */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Ways to Contribute</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 text-sm">🐛</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-200">Report Bugs</h3>
                        <p className="text-slate-400 text-sm">Found an issue? Help us improve by reporting bugs with detailed descriptions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-sm">💡</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-200">Suggest Features</h3>
                        <p className="text-slate-400 text-sm">Have ideas for new features or improvements? Open an issue to discuss them.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-sm">📝</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-200">Improve Documentation</h3>
                        <p className="text-slate-400 text-sm">Help others by improving documentation, adding examples, or writing guides.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-400 text-sm">⚡</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-200">Submit Code</h3>
                        <p className="text-slate-400 text-sm">Contribute code fixes, new features, or performance improvements via pull requests.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-400 text-sm">🧪</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-200">Test Features</h3>
                        <p className="text-slate-400 text-sm">Help test new features and provide feedback during development cycles.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-400 text-sm">🤝</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-200">Help Others</h3>
                        <p className="text-slate-400 text-sm">Answer questions, help troubleshoot issues, and welcome new contributors.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-semibold">Community Guidelines</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">🤗 Be Welcoming</h3>
                    <p className="text-slate-400 text-sm">Welcome newcomers and create an inclusive environment for all contributors</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">🎯 Stay On Topic</h3>
                    <p className="text-slate-400 text-sm">Keep discussions relevant to the HTML ↔ Markdown Converter project</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">💬 Be Constructive</h3>
                    <p className="text-slate-400 text-sm">Provide helpful feedback and constructive criticism when discussing ideas or code</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">🔍 Search First</h3>
                    <p className="text-slate-400 text-sm">Before opening new issues, search existing ones to avoid duplicates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Community Activity</h2>
                
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg animate-pulse">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                        </div>
                        <div className="h-3 bg-slate-600 rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                    <p className="text-slate-400 mb-2">Unable to load recent activity</p>
                    <p className="text-slate-500 text-sm">Check back later for the latest updates</p>
                  </div>
                ) : activities.length === 0 ? (
                  <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                    <p className="text-slate-400 mb-2">No recent activity found</p>
                    <p className="text-slate-500 text-sm">Be the first to contribute to the project!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activities.map((activity: GitHubActivity, index: number) => {
                      const colorClasses = {
                        green: 'bg-green-400',
                        blue: 'bg-blue-400',
                        purple: 'bg-purple-400',
                        yellow: 'bg-yellow-400'
                      };
                      
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${colorClasses[activity.color as keyof typeof colorClasses] || 'bg-slate-400'}`}></div>
                          <div className="flex-1">
                            <span className="text-slate-300">@{activity.actor}</span>
                            <span className="text-slate-500 mx-2">{activity.action}</span>
                            <span className="text-slate-400">"{activity.description}"</span>
                          </div>
                          <span className="text-slate-500 text-sm">{activity.timeAgo}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Discussions</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Join GitHub Discussions for feature ideas, questions, and community chat
                  </p>
                  <a 
                    href="https://github.com/timorris/html-to-markdown/discussions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Join Discussions
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Contributors</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    See all the amazing people who have contributed to this project
                  </p>
                  <a 
                    href="https://github.com/timorris/html-to-markdown/graphs/contributors" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    View Contributors
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Get Started */}
            <div className="text-center">
              <p className="text-slate-400 mb-4">Ready to get involved?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="https://github.com/timorris/html-to-markdown" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
                </a>
                <Link 
                  href="/support" 
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}