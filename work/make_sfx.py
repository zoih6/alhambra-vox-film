import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
SR=48000; DUR=33.0; buf=np.zeros(int(SR*DUR)); rng=np.random.default_rng(42)
def bp(x,lo,hi,order=3):
    sos=butter(order,[lo,hi],btype='bandpass',fs=SR,output='sos'); return sosfilt(sos,x)
def lp(x,c,order=3):
    sos=butter(order,c,btype='lowpass',fs=SR,output='sos'); return sosfilt(sos,x)
def hp(x,c,order=3):
    sos=butter(order,c,btype='highpass',fs=SR,output='sos'); return sosfilt(sos,x)
def add(t0,sig,gain=1.0):
    i=int(t0*SR); n=min(len(sig),len(buf)-i); buf[i:i+n]+=sig[:n]*gain
def env(n,kind='decay',a=0.01):
    t=np.arange(n)/SR
    if kind=='decay': return np.exp(-t* (6/ (n/SR)) )
    if kind=='swell': return np.sin(np.pi*np.clip(t/(n/SR),0,1))**2
    return np.ones(n)
def paper_slide(dur=.4,g=.5):
    n=int(SR*dur); x=bp(rng.standard_normal(n),700,5200); add(CUR[0], x*env(n,'swell')*.6, g)
def paper_tap(g=.7):
    n=int(SR*.13); x=lp(rng.standard_normal(n),900)*env(n)
    s=np.sin(2*np.pi*150*np.arange(n)/SR)*np.exp(-np.arange(n)/SR*45)
    add(CUR[0], x*.5+s*.35, g)
def stone_thud(g=.9):
    n=int(SR*.5); tt=np.arange(n)/SR
    s=np.sin(2*np.pi*(68-38*tt)*tt)*np.exp(-tt*11)
    x=lp(rng.standard_normal(n),420)*np.exp(-tt*16)
    add(CUR[0], s*.9+x*.5, g)
def pen_scratch(dur=1.1,g=.4):
    n=int(SR*dur); tt=np.arange(n)/SR
    mod=(.55+.45*np.sin(2*np.pi*7*tt))*(rng.random(n)>.25)
    x=hp(rng.standard_normal(n),2600)*mod*np.sin(np.pi*tt/dur)
    add(CUR[0], x*.5, g)
def string_zip(dur=.9,g=.4):
    n=int(SR*dur); tt=np.arange(n)/SR
    # sweep bandpass via segments
    x=rng.standard_normal(n); y=np.zeros(n); seg=2048
    for i in range(0,n,seg):
        f=500+2600*(i/n); y[i:i+seg]=bp(x[i:i+seg],max(80,f-260),f+260) if f>340 else x[i:i+seg]
    add(CUR[0], y*np.sin(np.pi*tt/dur)*.7, g)
def tape_press(g=.5):
    n=int(SR*.22); tt=np.arange(n)/SR
    x=bp(rng.standard_normal(n),1100,3800)*np.exp(-tt*13)
    add(CUR[0],x*.6,g)
def pin_click(g=.35):
    n=int(SR*.06); tt=np.arange(n)/SR
    add(CUR[0], np.sin(2*np.pi*2900*tt)*np.exp(-tt*160)*.8+lp(rng.standard_normal(n),2000)*np.exp(-tt*120)*.4, g)
def stamp(g=.8):
    n=int(SR*.35); tt=np.arange(n)/SR
    add(CUR[0], np.sin(2*np.pi*(95-40*tt)*tt)*np.exp(-tt*13)*.8+lp(rng.standard_normal(n),650)*np.exp(-tt*17)*.55, g)
CUR=[0.0]
def at(t,fn,*a,**k):
    CUR[0]=t; fn(*a,**k)
at(.55,paper_slide); at(.95,stone_thud); at(.6,paper_tap)
at(1.55,pen_scratch,1.1); at(2.75,string_zip,.8); at(3.05,tape_press)
at(4.55,paper_slide)
for t in (5.74,6.06,6.38): at(t,paper_tap,.8)
for t in (7.35,7.7,8.05,8.4): at(t,pin_click,.25)
at(11.3,paper_slide,.5)
for t in (12.7,13.0,13.3): at(t,paper_tap,.55)
for t in (14.1,14.5,14.9): at(t,paper_slide,.32); at(t+.22,paper_tap,.6)
at(16.1,string_zip,1.2,.45); at(17.4,pin_click,.4)
at(22.55,paper_slide,.55); at(23.55,pen_scratch,1.3,.45)
at(26.35,paper_slide,.5); at(27.28,stamp,.85); at(29.05,tape_press); at(30.05,pin_click,.4)
buf=np.clip(buf,-1,1)
sf.write("/home/user/deliverables/sfx_v2.wav", buf, SR)
print("sfx_v2.wav", round(len(buf)/SR,2),"s  peak", round(float(np.abs(buf).max()),3))
