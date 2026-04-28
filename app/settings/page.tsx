import { Settings, User, Palette, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b-2 border-foreground">
            <div className="flex items-center gap-3 px-6 py-4 lg:px-8">
              <div className="p-2 rounded bg-secondary border-2 border-foreground">
                <Settings className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">设置</h1>
                <p className="text-sm text-muted-foreground">管理你的账户和偏好</p>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Profile Section */}
              <section className="bg-card border-2 border-foreground rounded p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">个人资料</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      艺术家名称
                    </label>
                    <input
                      type="text"
                      placeholder="你的名字或笔名"
                      className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      创作领域
                    </label>
                    <input
                      type="text"
                      placeholder="例如：油画、水彩、数字艺术..."
                      className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      个人简介
                    </label>
                    <textarea
                      placeholder="简单介绍一下你的艺术追求..."
                      rows={3}
                      className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Preferences Section */}
              <section className="bg-card border-2 border-foreground rounded p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">偏好设置</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b-2 border-foreground">
                    <div>
                      <p className="font-medium text-foreground">AI 回应风格</p>
                      <p className="text-sm text-muted-foreground">
                        选择 AI 顾问的交流方式
                      </p>
                    </div>
                    <select className="px-4 py-2 text-foreground">
                      <option>专业学术</option>
                      <option>温暖亲切</option>
                      <option>简洁直接</option>
                    </select>
                  </div>
                  <div className="py-3 border-b-2 border-foreground">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-foreground">美术史参考偏好</p>
                        <p className="text-sm text-muted-foreground">
                          选择参考作品的时期范围（可多选）
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {/* 西方美术史 */}
                      <div className="col-span-2 mb-2">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">西方美术史</p>
                      </div>
                      {[
                        { id: "ancient", label: "古代艺术", desc: "古希腊罗马 (前800-476)" },
                        { id: "medieval", label: "中世纪", desc: "拜占庭/哥特 (476-1400)" },
                        { id: "renaissance", label: "文艺复兴", desc: "达芬奇/米开朗基罗 (1400-1600)" },
                        { id: "baroque", label: "巴洛克", desc: "卡拉瓦乔/伦勃朗 (1600-1750)" },
                        { id: "rococo", label: "洛可可", desc: "华托/弗拉戈纳尔 (1700-1780)" },
                        { id: "neoclassical", label: "新古典主义", desc: "大卫/安格尔 (1750-1850)" },
                        { id: "romanticism", label: "浪漫主义", desc: "德拉克洛瓦/透纳 (1780-1850)" },
                        { id: "realism", label: "现实主义", desc: "库尔贝/米勒 (1840-1880)" },
                        { id: "impressionism", label: "印象派", desc: "莫奈/雷诺阿 (1860-1890)" },
                        { id: "postimpressionism", label: "后印象派", desc: "梵高/塞尚/高更 (1880-1910)" },
                        { id: "expressionism", label: "表现主义", desc: "蒙克/基尔希纳 (1905-1930)" },
                        { id: "cubism", label: "立体主义", desc: "毕加索/布拉克 (1907-1920)" },
                        { id: "surrealism", label: "超现实主义", desc: "达利/马格利特 (1920-1950)" },
                        { id: "abstractexpressionism", label: "抽象表现主义", desc: "波洛克/罗斯科 (1940-1960)" },
                        { id: "popart", label: "波普艺术", desc: "沃霍尔/利希滕斯坦 (1950-1970)" },
                        { id: "contemporary", label: "当代艺术", desc: "1970至今" },
                      ].map((period) => (
                        <label
                          key={period.id}
                          className="flex items-start gap-3 p-3 bg-secondary border-2 border-foreground rounded cursor-pointer hover:bg-muted transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{period.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{period.desc}</p>
                          </div>
                        </label>
                      ))}
                      
                      {/* 中国美术史 */}
                      <div className="col-span-2 mt-4 mb-2">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">中国美术史</p>
                      </div>
                      {[
                        { id: "cn-prehistoric", label: "史前至商周", desc: "彩陶/岩画/青铜纹饰 (前6000-前771)" },
                        { id: "cn-springautumn", label: "春秋战国", desc: "漆画/帛画/楚美术 (前770-前221)" },
                        { id: "cn-qinhan", label: "秦汉", desc: "画像石/帛画/马王堆 (前221-220)" },
                        { id: "cn-weijin", label: "魏晋南北朝", desc: "顾恺之/敦煌早期 (220-589)" },
                        { id: "cn-suitang", label: "隋唐五代", desc: "阎立本/吴道子/张萱/周昉 (581-960)" },
                        { id: "cn-northsong", label: "北宋", desc: "范宽/郭熙/李成/张择端 (960-1127)" },
                        { id: "cn-southsong", label: "南宋", desc: "马远/夏圭/刘松年/李唐 (1127-1279)" },
                        { id: "cn-yuan", label: "元代", desc: "赵孟頫/黄公望/倪瓒/王蒙 (1271-1368)" },
                        { id: "cn-earlyming", label: "明初至中期", desc: "戴进/沈周/文徵明/唐寅 (1368-1550)" },
                        { id: "cn-lateming", label: "明末", desc: "董其昌/陈洪绑/徐渭 (1550-1644)" },
                        { id: "cn-earlyqing", label: "清初", desc: "四王/四僧/八大山人/石涛 (1644-1735)" },
                        { id: "cn-midqing", label: "清中期", desc: "扬州八怪/郑板桥/金农 (1735-1850)" },
                        { id: "cn-lateqing", label: "清末", desc: "任伯年/吴昌硕/虚谷 (1850-1911)" },
                        { id: "cn-earlymodern", label: "民国", desc: "齐白石/黄宾虹/张大千/徐悲鸿 (1912-1949)" },
                        { id: "cn-contemporary", label: "当代中国", desc: "吴冠中/赵无极/朱德群 (1949至今)" },
                        { id: "cn-dunhuang", label: "敦煌专题", desc: "壁画/彩塑 (4-14世纪)" },
                        { id: "cn-literati", label: "文人画专题", desc: "写意山水/花鸟/题跋" },
                        { id: "cn-gongbi", label: "工笔画专题", desc: "院体/仕女/花鸟工笔" },
                      ].map((period) => (
                        <label
                          key={period.id}
                          className="flex items-start gap-3 p-3 bg-secondary border-2 border-foreground rounded cursor-pointer hover:bg-muted transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{period.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{period.desc}</p>
                          </div>
                        </label>
                      ))}
                      

                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">每日记录提醒</p>
                      <p className="text-sm text-muted-foreground">
                        提醒你记录创作灵感
                      </p>
                    </div>
                    <button className="relative w-12 h-6 bg-primary rounded-full transition-colors">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Data Section */}
              <section className="bg-card border-2 border-foreground rounded p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">数据与隐私</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b-2 border-foreground">
                    <div>
                      <p className="font-medium text-foreground">导出日志数据</p>
                      <p className="text-sm text-muted-foreground">
                        下载你所有的创作日志
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-card border-2 border-foreground rounded text-foreground hover:bg-secondary transition-colors">
                      导出
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-destructive">清除所有数据</p>
                      <p className="text-sm text-muted-foreground">
                        删除你的所有日志和分析记录
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-card border-2 border-destructive rounded text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
                      清除
                    </button>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="text-center py-8 text-muted-foreground">
                <p className="text-sm mb-2">画境 v0.1.0</p>
                <p className="text-xs">为艺术创作者而生的 AI 创作伴侣</p>
              </section>
            </div>
          </div>
    </div>
  );
}
