export default function TerminalCode() {
    return (
        <div className="terminal">
            <div className="live-badge"><span className="live-dot"></span>LIVE BUILD</div>
            <div className="terminal-bar" style={{ background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid rgba(59, 130, 246, 0.15)' }}>
                <span style={{ fontSize: '0.65rem', color: '#3B82F6', letterSpacing: '0.1em' }}>● AI_ENGINE_ACTIVE</span>
                <span className="t-filename">neoklyn_sys.py</span>
            </div>
            <div className="terminal-body">
                <span className="t-comment">{`# Initializing NeoKlyn Generative AI Core`}</span><br />
                <span className="t-comment">{`# Loading proprietary agents...`}</span><br /><br />

                <span className="t-key">class</span> <span className="t-fn">NeoKlynIntelligence</span><span className="t-punc">(</span><span className="t-fn">BaseAgent</span><span className="t-punc">):</span><br />
                &nbsp;&nbsp;<span className="t-key">def</span> <span className="t-fn">__init__</span><span className="t-punc">(</span><span className="t-key">self</span><span className="t-punc">):</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">model</span> <span className="t-punc">=</span> <span className="t-str">&quot;NK-Vision-v4&quot;</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">capabilities</span> <span className="t-punc">=</span> <span className="t-punc">[</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Autonomous Web Agents&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Generative UI/UX&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Predictive Marketing&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;AI Agents&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Generative AI&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Web Development&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Mobile Apps&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Ecommerce&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;3D Websites&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Digital Marketing&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;SEO &amp; PPC&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-punc">]</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">success_rate</span> <span className="t-punc">=</span> <span className="t-num">0.99</span><br /><br />

                &nbsp;&nbsp;<span className="t-key">def</span> <span className="t-fn">execute</span><span className="t-punc">(</span><span className="t-key">self</span><span className="t-punc">,</span> <span className="t-fn">project</span><span className="t-punc">):</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">return</span> <span className="t-fn">optimize_conversion</span><span className="t-punc">(</span><span className="t-fn">project</span><span className="t-punc">)</span><br /><br />

                <span className="t-key">await</span> <span className="t-fn">NeoKlynIntelligence</span><span className="t-punc">().</span><span className="t-fn">execute</span><span className="t-punc">(</span><span className="t-fn">target_project</span><span className="t-punc">)</span> <span className="t-cursor"></span>
            </div>
        </div>
    );
}
