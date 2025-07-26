export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-700 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Disclaimer */}
        <div className="mb-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0">🔒</div>
            <div className="text-sm">
              <p className="text-slate-300 font-medium">Privacy Notice</p>
              <p className="text-slate-400 mt-1">
                All content you enter stays completely local in your browser. We do not store, transmit, or access any of your HTML or Markdown content. 
                Your data remains private and secure on your device.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>Built with</span>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-slate-800 rounded text-xs">marked.js</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs">turndown.js</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs">Tailwind CSS</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors duration-200">Privacy</a>
            <a href="/terms" className="text-slate-400 hover:text-slate-300 transition-colors duration-200">Terms</a>
            <a href="/support" className="text-slate-400 hover:text-slate-300 transition-colors duration-200">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}