export default function TerminalCode() {
    return (
        <div className="terminal">
            <div className="live-badge"><span className="live-dot"></span>LIVE BUILD</div>
            <div className="terminal-bar" style={{ background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid rgba(59, 130, 246, 0.15)' }}>
                <span style={{ fontSize: '0.65rem', color: '#3B82F6', letterSpacing: '0.1em' }}>● AI_ENGINE_ACTIVE</span>
                <span className="t-filename">neoklyn_sys.py</span>
            </div>
            <div className="terminal-body">
                <span className="t-comment">{`# NeoKlyn — AI-accelerated development`}</span><br /><br />

                <span className="t-key">class</span> <span className="t-fn">NeoKlyn</span><span className="t-punc">(</span><span className="t-fn">Studio</span><span className="t-punc">):</span><br />
                &nbsp;&nbsp;<span className="t-key">def</span> <span className="t-fn">__init__</span><span className="t-punc">(</span><span className="t-key">self</span><span className="t-punc">):</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">founded</span> <span className="t-punc">=</span> <span className="t-str">&quot;Bengaluru, 2026&quot;</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">engineer_experience</span> <span className="t-punc">=</span> <span className="t-str">&quot;10+ years&quot;</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">build_method</span> <span className="t-punc">=</span> <span className="t-str">&quot;AI-accelerated&quot;</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">review_method</span> <span className="t-punc">=</span> <span className="t-str">&quot;senior engineer, every line&quot;</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">self</span><span className="t-punc">.</span><span className="t-fn">delivers</span> <span className="t-punc">=</span> <span className="t-punc">[</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Web Apps&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;Mobile Apps&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;Ecommerce&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;AI Agents&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;Generative AI&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;3D Websites&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-punc">]</span><br /><br />

                &nbsp;&nbsp;<span className="t-key">def</span> <span className="t-fn">execute</span><span className="t-punc">(</span><span className="t-key">self</span><span className="t-punc">,</span> <span className="t-fn">project</span><span className="t-punc">):</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">return</span> <span className="t-fn">build_fast</span><span className="t-punc">(</span><span className="t-fn">project</span><span className="t-punc">,</span> <span className="t-fn">review</span><span className="t-punc">=</span><span className="t-str">&quot;human&quot;</span><span className="t-punc">,</span> <span className="t-fn">quality</span><span className="t-punc">=</span><span className="t-str">&quot;agency-grade&quot;</span><span className="t-punc">)</span> <span className="t-cursor"></span>
            </div>
        </div>
    );
}
