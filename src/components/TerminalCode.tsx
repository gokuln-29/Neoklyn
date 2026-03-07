export default function TerminalCode() {
    return (
        <div className="terminal">
            <div className="live-badge"><span className="live-dot"></span>LIVE BUILD</div>
            <div className="terminal-bar">
                <div className="t-dot"></div><div className="t-dot"></div><div className="t-dot"></div>
                <span className="t-filename">neoklyn.config.js</span>
            </div>
            <div className="terminal-body">
                <span className="t-comment">{`// NeoKlyn Digital Studio`}</span><br />
                <span className="t-comment">{`// Est. India · US · UAE`}</span><br /><br />

                <span className="t-key">const</span> <span className="t-fn">studio</span> <span className="t-punc">=</span> <span className="t-punc">{'{'}</span><br />
                &nbsp;&nbsp;<span className="t-key">name</span><span className="t-punc">:</span> <span className="t-str">&quot;NeoKlyn.com&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;<span className="t-key">services</span><span className="t-punc">:</span> <span className="t-punc">[</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Web Development&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Mobile Apps&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Ecommerce&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;3D Websites&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="t-str">&quot;Digital Marketing&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;<span className="t-punc">],</span><br />
                &nbsp;&nbsp;<span className="t-key">markets</span><span className="t-punc">:</span> <span className="t-punc">[</span><span className="t-str">&quot;US&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;UAE&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;India&quot;</span><span className="t-punc">],</span><br />
                &nbsp;&nbsp;<span className="t-key">projects</span><span className="t-punc">:</span> <span className="t-num">120</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;<span className="t-key">satisfaction</span><span className="t-punc">:</span> <span className="t-str">&quot;98%&quot;</span><span className="t-punc">,</span><br />
                &nbsp;&nbsp;<span className="t-key">status</span><span className="t-punc">:</span> <span className="t-fn">available</span><span className="t-punc">()</span><br />
                <span className="t-punc">{'}'}</span><br /><br />

                < span className="t-fn">module</span><span className="t-punc">.</span><span className="t-key">exports</span> <span className="t-punc">=</span> <span className="t-fn">studio</span><span className="t-punc">;</span> <span className="t-cursor"></span>
            </div>
        </div>
    );
}
