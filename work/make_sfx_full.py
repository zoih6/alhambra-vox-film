import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
SR=48000; DUR=266.0; buf=np.zeros(int(SR*DUR)); rng=np.random.default_rng(7)
def bp(x,lo,hi,o=3): return sosfilt(butter(o,[lo,hi],btype='bandpass',fs=SR,output='sos'),x)
def lp(x,c,o=3): return sosfilt(butter(o,c,btype='lowpass',fs=SR,output='sos'),x)
def hp(x,c,o=3): return sosfilt(butter(o,c,btype='highpass',fs=SR,output='sos'),x)
def add(t0,sig,g=1.0):
    i=int(t0*SR); n=min(len(sig),len(buf)-i); buf[i:i+n]+=sig[:n]*g
CUR=[0.]
def at(t,fn,*a,**k): CUR[0]=t; fn(*a,**k)
def paper_slide(d=.4,g=.45):
    n=int(SR*d); x=bp(rng.standard_normal(n),700,5200); add(CUR[0], x*(np.sin(np.pi*np.arange(n)/n)**2)*.6,g)
def paper_tap(g=.65):
    n=int(SR*.13); tt=np.arange(n)/SR; add(CUR[0], lp(rng.standard_normal(n),900)*np.exp(-tt*46)*.5+np.sin(2*np.pi*150*tt)*np.exp(-tt*45)*.3,g)
def thud(g=.85):
    n=int(SR*.5); tt=np.arange(n)/SR; add(CUR[0], np.sin(2*np.pi*(68-38*tt)*tt)*np.exp(-tt*11)*.9+lp(rng.standard_normal(n),420)*np.exp(-tt*16)*.5,g)
def scratch(d=1.1,g=.35):
    n=int(SR*d); tt=np.arange(n)/SR; mod=(.55+.45*np.sin(2*np.pi*7*tt))*(rng.random(n)>.25); add(CUR[0], hp(rng.standard_normal(n),2600)*mod*np.sin(np.pi*tt/d)*.5,g)
def zip_(d=.9,g=.35):
    n=int(SR*d); x=rng.standard_normal(n); y=np.zeros(n); seg=2048
    for i in range(0,n,seg):
        f=500+2600*(i/n); y[i:i+seg]=bp(x[i:i+seg],max(90,f-260),f+260)
    add(CUR[0], y*np.sin(np.pi*np.arange(n)/n)*.7,g)
def tape_(g=.45):
    n=int(SR*.22); tt=np.arange(n)/SR; add(CUR[0], bp(rng.standard_normal(n),1100,3800)*np.exp(-tt*13)*.6,g)
def pin_(g=.3):
    n=int(SR*.06); tt=np.arange(n)/SR; add(CUR[0], np.sin(2*np.pi*2900*tt)*np.exp(-tt*160)*.8,g)
def stamp_(g=.8):
    n=int(SR*.35); tt=np.arange(n)/SR; add(CUR[0], np.sin(2*np.pi*(95-40*tt)*tt)*np.exp(-tt*13)*.8+lp(rng.standard_normal(n),650)*np.exp(-tt*17)*.55,g)
def clank(g=.5):
    n=int(SR*.7); tt=np.arange(n)/SR
    s=sum(np.sin(2*np.pi*f*tt)*np.exp(-tt*d) for f,d in [(1244,9),(1873,13),(2513,18),(832,7)])
    add(CUR[0], s*.22,g)
def pluck(freq,t0,g=.30):  # Karplus-Strong-ish damped harmonic pluck
    n=int(SR*1.4); tt=np.arange(n)/SR
    s=np.sin(2*np.pi*freq*tt)*np.exp(-tt*3.2)+.5*np.sin(2*np.pi*freq*2*tt)*np.exp(-tt*5)+.25*np.sin(2*np.pi*freq*3*tt)*np.exp(-tt*8)
    add(t0,s,g)
def water(t0,t1,g=.16):  # gentle channel water: looping filtered noise w/ slow swell
    n=int(SR*(t1-t0)); tt=np.arange(n)/SR
    x=bp(rng.standard_normal(n),380,1400)*(0.7+0.3*np.sin(2*np.pi*.35*tt))
    add(t0, x*.5*np.minimum(1,tt/1.5)*np.minimum(1,(t1-t0-tt)/1.5), g)
# preview section (same design as v3)
at(.55,paper_slide); at(.95,thud); at(1.55,scratch,1.1); at(2.75,zip_,.8); at(3.05,tape_)
at(4.55,paper_slide)
for t in (5.74,6.06,6.38): at(t,paper_tap,.75)
at(11.3,paper_slide,.5)
for t in (12.7,13.0,13.3): at(t,paper_tap,.5)
for t in (14.1,14.5,14.9): at(t,paper_slide,.3); at(t+.22,paper_tap,.55)
at(16.1,zip_,1.2,.4); at(22.55,paper_slide,.5); at(23.55,scratch,1.3,.4)
at(26.35,paper_slide,.5); at(27.28,stamp_,.8); at(29.05,tape_)
# full film beats: slide before land + tap on land for every major entrance
beats=[33.2,37.4,42.4,46.2,50.8,55.4, 62.2,66,70.4,74.8,79.4,83.4, 91,94.8,98.4,101.8,105.8,
111.3,115.2,117.2,121.4, 126.9,132.2,136.2,140.2, 147.9,152.2,156.8,161.2,
168.9,173.2,177.5,183,187.2, 197.3,201.2,205.4,208.4,213.2, 221.4,225.2,233.5,236.5,242.2]
for t in beats: at(t-.25,paper_slide,.32); at(t+.05,paper_tap,.5)
for t in (34,71.2,116,122.2,141.5,169.8,227): at(t,stamp_,.55)
at(91,thud,.9); at(111.3,thud,.7); at(126.9,thud,.7); at(168.9,clank,.6); at(173.2,clank,.35)
water(62.5,80)
for t,f in [(170,196.0),(174,146.8),(178,220.0),(182,164.8),(186,196.0),(190,146.8),(193,110.0)]: pluck(f,t,.26)
at(183,zip_,1.0,.3)
buf=np.clip(buf,-1,1); sf.write("/home/user/deliverables/sfx_full.wav",buf,SR)
print("sfx_full.wav",round(len(buf)/SR,1),"s peak",round(float(np.abs(buf).max()),3))
