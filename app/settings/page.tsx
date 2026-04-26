import { Sidebar } from "@/components/sidebar";
import { Settings, User, Palette, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
            <div className="flex items-center gap-3 px-6 py-4 lg:px-8">
              <div className="p-2 rounded-lg bg-secondary border border-border">
                <Settings className="w-5 h-5 text-muted-foreground" />
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
              <section className="bg-card border border-border rounded-xl p-6">
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
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      创作领域
                    </label>
                    <input
                      type="text"
                      placeholder="例如：油画、水彩、数字艺术..."
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      个人简介
                    </label>
                    <textarea
                      placeholder="简单介绍一下你的艺术追求..."
                      rows={3}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Preferences Section */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">偏好设置</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">AI 回应风格</p>
                      <p className="text-sm text-muted-foreground">
                        选择 AI 顾问的交流方式
                      </p>
                    </div>
                    <select className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>专业学术</option>
                      <option>温暖亲切</option>
                      <option>简洁直接</option>
                    </select>
                  </div>
                  <div className="py-3 border-b border-border">
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
                          className="flex items-start gap-3 p-3 bg-secondary/50 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{period.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{period.desc}</p>
                          </div>
                        </label>
                      ))}
                      
                      {/* 东方美术史 */}
                      <div className="col-span-2 mt-4 mb-2">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">东方美术史</p>
                      </div>
                      {[
                        { id: "chinese-ancient", label: "先秦至汉", desc: "青铜器/帛画 (前2000-220)" },
                        { id: "chinese-tang", label: "魏晋隋唐", desc: "顾恺之/吴道子 (220-907)" },
                        { id: "chinese-song", label: "宋元", desc: "范宽/黄公望 (960-1368)" },
                        { id: "chinese-ming", label: "明清", desc: "文徵明/八大山人 (1368-1911)" },
                        { id: "chinese-modern", label: "近现代中国", desc: "齐白石/张大千 (1911至今)" },
                        { id: "japanese", label: "日本美术", desc: "浮世绘/琳派/近现代" },
                        { id: "ukiyoe", label: "浮世绘专项", desc: "葛饰北斋/歌川广重" },
                      ].map((period) => (
                        <label
                          key={period.id}
                          className="flex items-start gap-3 p-3 bg-secondary/50 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
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
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">数据与隐私</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">导出日志数据</p>
                      <p className="text-sm text-muted-foreground">
                        下载你所有的创作日志
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground hover:bg-secondary/80 transition-colors">
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
                    <button className="px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive hover:bg-destructive/20 transition-colors">
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
      </main>
    </div>
  );
}
