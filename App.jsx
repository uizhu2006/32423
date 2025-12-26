import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Layers, Smartphone, Monitor, Users, 
  Award, Mail, Phone, MapPin, CheckCircle, Code, Zap, Briefcase, Loader2
} from 'lucide-react';

// =============================================================================
// 🟢 配置区域：Google Web App URL (必须替换)
// =============================================================================
// 您的表格链接: https://docs.google.com/spreadsheets/d/1v18RzbQOXweCp74pzad3Ni5MdtUeqPuoBYp6oHPCTlg...
// 请将此处替换为您在 Google Apps Script 点击"部署" -> "Web应用"后生成的长链接:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCbqZiT97stNqFWK-LYAYzeM2UfBppt8F1TEGSkKlXw4uIlpuXwc2M_bMT_E9l3v0q/exec"; 

// -----------------------------------------------------------------------------
// Logo 组件
// -----------------------------------------------------------------------------
const YoutuLogo = ({ className = "w-8 h-8", width = 28, height = 32 }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 28 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path d="M9.65739 0H3.56675C3.23972 0 2.97461 0.264201 2.97461 0.590109V6.65981C2.97461 6.98571 3.23972 7.24992 3.56675 7.24992H9.65739C9.98442 7.24992 10.2495 6.98571 10.2495 6.65981V0.590109C10.2495 0.264201 9.98442 0 9.65739 0Z" fill="#00AEB9"/>
    <path d="M24.423 0H18.3324C18.0053 0 17.7402 0.264201 17.7402 0.590109V6.65981C17.7402 6.98571 18.0053 7.24992 18.3324 7.24992H24.423C24.75 7.24992 25.0152 6.98571 25.0152 6.65981V0.590109C25.0152 0.264201 24.75 0 24.423 0Z" fill="#00AEB9"/>
    <path d="M27.4079 9.50195H21.2689C20.9426 9.50195 20.6767 9.7669 20.6767 10.0921V11.3566C20.6767 11.3566 20.7009 17.5467 20.6767 23.9054C20.6767 24.6882 19.9275 24.7364 19.9275 24.7364H8.06042C8.06042 24.7364 7.31118 24.7003 7.31118 23.9054C7.29909 17.5467 7.33535 11.3566 7.33535 11.3566V10.0921C7.33535 9.7669 7.06949 9.50195 6.7432 9.50195H0.592145C0.265861 9.50195 0 9.7669 0 10.0921C0 10.0921 0 9.04432 0 12.7656V28.9996C0.1571 31.1192 1.22054 31.9382 3.12991 31.9502C3.12991 31.9502 6.8278 32.0104 9.12387 31.9984H18.8761C21.1843 31.9984 24.8701 31.9502 24.8701 31.9502C26.7674 31.9261 27.8429 31.1192 28 28.9996V12.7656C28 9.04432 28 10.0921 28 10.0921C28 9.7669 27.7341 9.50195 27.4079 9.50195Z" fill="#2C5BA5"/>
    <path d="M17.7764 12.7536V10.0198C17.7764 9.69463 17.5105 9.42969 17.1842 9.42969H11.0453C10.719 9.42969 10.4531 9.69463 10.4531 10.0198V11.6577C10.4531 11.6577 10.4894 14.9574 10.4894 19.1243H10.5015V21.7497C10.5015 22.0749 10.7673 22.3398 11.0936 22.3398H17.1842C17.5105 22.3398 17.7764 22.0749 17.7764 21.7497V15.3549C17.7764 15.3549 17.7764 15.3187 17.7764 15.2947C17.7764 13.994 17.7764 12.886 17.7764 12.7536Z" fill="#00AEB9"/>
  </svg>
);

// -----------------------------------------------------------------------------
// 样式注入
// -----------------------------------------------------------------------------
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #0b1120;
      color: #f8fafc;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0b1120; 
    }
    ::-webkit-scrollbar-thumb {
      background: #334155; 
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #475569; 
    }

    /* 品牌色定义 */
    :root {
      --brand-teal: #00AEB9;
      --brand-blue: #2C5BA5;
    }

    /* 动画 */
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }

    /* 玻璃拟态卡片 */
    .glass-card {
      background: rgba(30, 41, 59, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    /* 文本渐变 - 配合Logo颜色 */
    .text-gradient {
      background: linear-gradient(to right, #00AEB9, #2C5BA5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .text-gradient-gold {
      background: linear-gradient(to right, #facc15, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}</style>
);

// -----------------------------------------------------------------------------
// 组件部分
// -----------------------------------------------------------------------------

const Button = ({ children, primary = false, onClick, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-out flex items-center gap-2 justify-center
      ${disabled ? "opacity-50 cursor-not-allowed transform-none" : "transform hover:scale-105 active:scale-95"}
      ${primary 
        ? "bg-[#00AEB9] hover:bg-[#0098a1] text-white shadow-lg shadow-[#00AEB9]/30 border border-transparent" 
        : "bg-transparent border border-slate-600 text-slate-300 hover:border-[#00AEB9] hover:text-white hover:bg-[#00AEB9]/10"}
      ${className}
    `}
  >
    {children}
  </button>
);

const SectionTitle = ({ subtitle, title, align = "center" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    <span className="text-[#00AEB9] font-semibold tracking-wider text-sm uppercase mb-2 block">{subtitle}</span>
    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
      {title}
    </h2>
    <div className={`h-1 w-20 bg-gradient-to-r from-[#00AEB9] to-[#2C5BA5] mt-6 rounded-full ${align === "center" ? "mx-auto" : ""}`}></div>
  </div>
);

// 彩色图标渲染器
const ColorIcon = ({ icon: Icon, color }) => (
  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-[#00AEB9]/30 bg-slate-800`}>
    <Icon className="w-7 h-7" style={{ color: color || '#00AEB9' }} />
  </div>
);

const ServiceCard = ({ icon: Icon, title, desc, tags }) => (
  <div className="glass-card p-8 rounded-2xl group hover:border-[#00AEB9]/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AEB9]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00AEB9]/20 transition-all duration-500"></div>
    <ColorIcon icon={Icon} color="#00AEB9" />
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00AEB9] transition-colors">{title}</h3>
    <p className="text-slate-400 mb-6 leading-relaxed text-sm">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const StatItem = ({ number, label, suffix = "+" }) => (
  <div className="text-center p-6 border-r border-slate-800 last:border-0">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
      {number}<span className="text-[#00AEB9]">{suffix}</span>
    </div>
    <p className="text-slate-500 text-sm uppercase tracking-widest">{label}</p>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '设计服务', href: '#services' },
    { name: '实战培训', href: '#training' },
    { name: '发展历程', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0b1120]/95 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
            <YoutuLogo className="w-8 h-auto" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">优途<span className="font-light text-slate-400">设计</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#00AEB9] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="#contact">
            <Button primary className="py-2 px-5 text-sm">联系我们</Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 hover:text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-300 hover:text-[#00AEB9] py-2 border-b border-slate-800/50">
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2">
            <Button primary className="w-full justify-center">联系我们</Button>
          </a>
        </div>
      )}
    </nav>
  );
};

// -----------------------------------------------------------------------------
// 主要页面结构
// -----------------------------------------------------------------------------

export default function App() {
  // 表单状态管理
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    type: '企业设计服务 (B端/App/Web)',
    desc: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 基础验证
    if (!formState.name || !formState.phone) {
      alert("请填写姓名和联系电话");
      return;
    }

    // 检查是否有配置 URL
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_SCRIPT")) {
      alert("请注意：\n您尚未在代码第12行填入 Google Script 部署链接。\n请按照教程部署 Apps Script，并将生成的 URL 填入代码中。");
      return;
    }

    setStatus('submitting');

    // 构建 FormData 对象
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('phone', formState.phone);
    formData.append('type', formState.type);
    formData.append('desc', formState.desc);

    // 发送请求到 Google Apps Script
    // 注意：mode: 'no-cors' 是必须的，因为 Google Apps Script 不支持标准的 CORS 响应
    // 这意味着我们无法读取响应内容，但请求会成功发送
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' 
    })
    .then(() => {
      // 假设成功（因为 no-cors 不报错即视为发送成功）
      setStatus('success');
      setFormState({ name: '', phone: '', type: '企业设计服务 (B端/App/Web)', desc: '' });
      setTimeout(() => setStatus('idle'), 5000); // 5秒后重置状态
    })
    .catch((error) => {
      console.error('Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-[#00AEB9] selection:text-white">
      <CustomStyles />
      <Navbar />

      {/* --- Hero Section --- */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00AEB9]/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#2C5BA5]/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-[#00AEB9] text-xs font-semibold tracking-wide border border-[#00AEB9]/20">
              <span className="w-2 h-2 rounded-full bg-[#00AEB9] animate-pulse"></span>
              蓝湖 & Eagle 签约合作伙伴
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              设计驱动<br />
              <span className="text-gradient">商业价值与人才</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg">
              优途不仅是顶尖的设计服务商，更是实战人才的孵化器。拒绝PPT讲课，用真实商业项目带你入行，服务中国移动、中石化等一线客户。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#services">
                <Button primary>探索设计服务 <ArrowRight className="w-4 h-4" /></Button>
              </a>
              <a href="#training">
                <Button>查看课程详情</Button>
              </a>
            </div>
            
            <div className="pt-8 flex items-center gap-6 opacity-80 transition-all duration-500">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Trusted By:</p>
              <span className="font-bold text-slate-400 hover:text-white transition-colors cursor-default">中国移动</span>
              <span className="font-bold text-slate-400 hover:text-white transition-colors cursor-default">中石化</span>
              <span className="font-bold text-slate-400 hover:text-white transition-colors cursor-default">国家环境部</span>
              <span className="font-bold text-slate-400 hover:text-white transition-colors cursor-default">公安部</span>
            </div>
          </div>

          {/* 右侧视觉图 */}
          <div className="relative hidden md:block perspective-1000">
            <div className="relative transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                alt="Dashboard UI" 
                className="rounded-xl shadow-2xl border border-slate-700 w-full object-cover opacity-90"
              />
              <div className="absolute -bottom-10 -left-10 bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="bg-[#00AEB9]/20 p-3 rounded-lg text-[#00AEB9]">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-400">累计培养学员</div>
                  <div className="text-xl font-bold text-white">1000+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Data Stats --- */}
      <section className="border-y border-slate-800 bg-[#0b1120]/50 relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          <StatItem number="12" suffix="年+" label="品牌历程" />
          <StatItem number="1000" suffix="+" label="培养学员" />
          <StatItem number="100" suffix="%" label="项目实战" />
          <StatItem number="Top" suffix="" label="签约伙伴" />
        </div>
      </section>

      {/* --- Services Section (B-End) --- */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Services" 
            title="企业级设计解决方案" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={Monitor}
              title="工业软件 UX/UI"
              desc="针对复杂的工业控制系统、MES、SCADA进行交互重构，提升操作效率，降低学习成本，兼顾美观与专业性。"
              tags={['上位机', '数据可视化', '人机交互']}
            />
            <ServiceCard 
              icon={Layers}
              title="企业 B 端系统"
              desc="为SaaS平台、ERP、CRM后台提供清晰的逻辑架构与视觉规范，打造高效、一致的企业级数字化体验。"
              tags={['SaaS', '后台管理', '设计系统']}
            />
            <ServiceCard 
              icon={Smartphone}
              title="APP 与 小程序"
              desc="基于iOS/Android规范的原生设计与跨平台小程序开发，从用户旅程图到高保真原型，不仅好看更好用。"
              tags={['移动端', '用户体验', '高保真']}
            />
            <ServiceCard 
              icon={Zap}
              title="品牌全案设计"
              desc="蓝湖/Eagle签约合作伙伴，为您提供从Logo到VI，再到官网全案的国际化品牌形象升级服务。"
              tags={['Logo', 'VI', 'Web官网']}
            />
            <ServiceCard 
              icon={Code}
              title="全栈开发服务"
              desc="设计还原度100%。提供前端(React/Vue)及后端开发服务，确保设计效果完美落地，性能极致优化。"
              tags={['前端开发', '响应式', '性能优化']}
            />
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-center items-center text-center border-dashed border-2 border-slate-700 hover:border-[#00AEB9]/50 cursor-pointer group">
              <div className="w-16 h-16 bg-[#00AEB9]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00AEB9]/20 transition-colors">
                <ArrowRight className="text-[#00AEB9] w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">定制化需求？</h3>
              <p className="text-slate-400 text-sm mb-4">联系我们获取专业咨询</p>
              <a href="#contact" className="text-[#00AEB9] font-semibold hover:text-[#00AEB9]/80">立即沟通 &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Training Section (C-End) --- */}
      <section id="training" className="py-24 bg-slate-800/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2C5BA5]/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#00AEB9] font-semibold tracking-wider text-sm uppercase mb-2 block">Youtu Academy</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                实战驱动，<span className="text-gradient-gold">就业后再离校</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                优途不仅是教育机构，更是一家正在服务一线客户的设计公司。这种双重身份让我们能将中国移动、中石化等真实项目无缝融入教学。
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "拒绝 PPT 讲课", desc: "我们用真实项目带人，确保每一个环节都贴合企业真实流程。" },
                  { title: "精品小班 & 创始人亲授", desc: "核心成员来自360、国家电网，拒绝流水线，手把手指导。" },
                  { title: "设计 + 开发全栈思维", desc: "不仅仅学画图，更懂落地，懂工业软件逻辑，懂前沿AI工具。" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[#00AEB9] border border-slate-700">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button className="bg-[#facc15] hover:bg-[#eab308] text-black border-none shadow-lg shadow-yellow-500/20">
                  预约免费试听 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 学员作品/课堂展示 */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000" alt="Classroom" className="rounded-xl shadow-lg border border-slate-700 hover:scale-105 transition-transform duration-500" />
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-[#00AEB9] font-bold text-2xl mb-1">100%</div>
                    <div className="text-xs text-slate-400">就业推荐率</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
                    <Users className="mx-auto text-[#00AEB9] mb-2" size={24} />
                    <div className="text-xs text-slate-400">一对一指导</div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Team work" className="rounded-xl shadow-lg border border-slate-700 hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md p-4 rounded-full border border-[#00AEB9]/50 shadow-2xl">
                 <span className="text-[#00AEB9] font-bold whitespace-nowrap px-4">UI / UX / AI全案设计</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- About/History Section --- */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
           <SectionTitle title="发展历程与背景" subtitle="Our Story" />
           
           <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
             <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-[#00AEB9]/30">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00AEB9] ring-4 ring-[#00AEB9]/20"></span>
                  <h3 className="text-2xl font-bold text-white mb-2">2013 · 诞生于北京</h3>
                  <p className="text-slate-400">优途在北京这片互联网创业的热土上诞生，汇聚了众多顶尖的互联网公司资源，为优途的成长奠定了坚实的技术与行业基础。</p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-[#00AEB9]/30">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#2C5BA5] ring-4 ring-[#2C5BA5]/20"></span>
                  <h3 className="text-2xl font-bold text-white mb-2">2016 · 迁至设计之都深圳</h3>
                  <p className="text-slate-400">为了进一步融合创新设计的城市氛围，优途迁至深圳。我们确立了“设计公司+教育机构”的双重身份，将商业实战无缝融入教学。</p>
                </div>

                <div className="relative pl-8 border-l-2 border-transparent">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600"></span>
                  <h3 className="text-2xl font-bold text-white mb-2">Now · 行业深耕</h3>
                  <p className="text-slate-400">
                    目前，我们是 <strong className="text-white">蓝湖</strong> 和 <strong className="text-white">Eagle</strong> 的签约合作伙伴。
                    长期服务 <strong className="text-white">中国移动、中石化、国家环境部、公安部</strong> 等一线客户。
                  </p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors">
                  <Briefcase className="text-[#00AEB9] mb-3 w-10 h-10" />
                  <div className="font-bold text-white">蓝湖</div>
                  <div className="text-xs text-slate-500">签约合作伙伴</div>
                </div>
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 transition-colors">
                  <Zap className="text-[#2C5BA5] mb-3 w-10 h-10" />
                  <div className="font-bold text-white">Eagle</div>
                  <div className="text-xs text-slate-500">签约合作伙伴</div>
                </div>
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center col-span-2 hover:bg-slate-800/50 transition-colors">
                   <div className="flex gap-4 opacity-50 mb-2">
                     <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                     <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                     <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                   </div>
                   <div className="font-bold text-white">服务一线政企客户</div>
                   <div className="text-xs text-slate-500">中石化 / 国家环境部 / 公安部</div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-gradient-to-b from-[#0b1120] to-[#0f172a] relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Contact Info */}
            <div className="md:w-2/5 p-10 bg-[#2C5BA5] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00AEB9] rounded-full blur-3xl opacity-50"></div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">联系我们</h3>
                <p className="text-blue-100 mb-8">无论是企业项目外包，还是学生课程咨询，我们都期待与您交流。</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase">咨询热线</p>
                      <p className="text-white font-mono text-xl font-bold">180-1879-6460</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase">公司地址</p>
                      <p className="text-white leading-tight">深圳市龙华区民治街道<br/>向南商业大厦4层413室<br/><span className="text-sm text-blue-200">(民治地铁A口附近)</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs uppercase">电子邮箱</p>
                      <p className="text-white font-mono text-lg">uizhu2006@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                 <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 inline-block">
                    <YoutuLogo className="w-12 h-auto text-white" />
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-3/5 p-10 bg-slate-900">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">您的姓名</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00AEB9] transition-colors" 
                      placeholder="张三" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">联系电话</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00AEB9] transition-colors" 
                      placeholder="180-xxxx-xxxx" 
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">咨询类型</label>
                  <select 
                    name="type"
                    value={formState.type}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00AEB9] transition-colors"
                  >
                    <option>企业设计服务 (B端/App/Web)</option>
                    <option>UI/UX 课程培训咨询</option>
                    <option>其他合作</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">需求描述</label>
                  <textarea 
                    name="desc"
                    value={formState.desc}
                    onChange={handleInputChange}
                    rows="4" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00AEB9] transition-colors" 
                    placeholder="请简要描述您的项目需求或学习目标..."
                  ></textarea>
                </div>

                <Button 
                  primary 
                  className="w-full justify-center text-lg" 
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      提交中...
                    </>
                  ) : status === 'success' ? (
                    '提交成功，我们会尽快联系您！'
                  ) : (
                    '提交信息'
                  )}
                </Button>
                {status === 'error' && (
                  <p className="text-center text-red-400 text-xs mt-2">提交失败，请检查网络或稍后重试。</p>
                )}
                <p className="text-center text-slate-500 text-xs mt-4">我们将严格保护您的隐私，并在24小时内与您联系。</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#050911] py-12 border-t border-slate-900 text-sm text-slate-500">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <YoutuLogo className="w-6 h-auto" />
             <span className="font-semibold text-slate-300">优途设计 Youtu Design</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#00AEB9] transition-colors">服务条款</a>
            <a href="#" className="hover:text-[#00AEB9] transition-colors">隐私政策</a>
            <a href="#" className="hover:text-[#00AEB9] transition-colors">学员作品集</a>
          </div>
          <p>&copy; 2025 Youtu Design. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}