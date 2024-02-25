Search.setIndex({"docnames": ["app_chapters/numerical_integration", "cpp_chapters/compilation_and_debugging", "cpp_chapters/values_and_types", "cpp_chapters/what_is_a_program", "hpc_chapters/ssh", "introduction", "title"], "filenames": ["app_chapters/numerical_integration.md", "cpp_chapters/compilation_and_debugging.md", "cpp_chapters/values_and_types.md", "cpp_chapters/what_is_a_program.md", "hpc_chapters/ssh.md", "introduction.md", "title.md"], "titles": ["<span class=\"section-number\">5. </span>Numerical Integration", "<span class=\"section-number\">3. </span>Compilation, Debugging and Debuggers", "<span class=\"section-number\">4. </span>Variables, Values, Types and Templates", "<span class=\"section-number\">2. </span>What is a program", "<span class=\"section-number\">6. </span>Connecting to remote servers", "<span class=\"section-number\">1. </span>Introduction", "Learning Scientific Computing"], "terms": {"In": [0, 1, 2, 3], "thi": [0, 1, 2, 3, 5], "chapter": [0, 1, 2, 3], "we": [0, 1, 2, 3, 5], "present": [0, 5], "sever": [0, 1], "techniqu": 0, "includ": [0, 1, 2, 3, 5], "riemann": 0, "sum": 0, "left": [0, 2, 3], "right": [0, 1, 2, 3], "midpoint": 0, "trapezoid": 0, "simpson": 0, "s": [0, 1, 2], "rule": [0, 3], "gaussian": 0, "quadratur": 0, "adapt": 0, "defin": [0, 1, 5], "interfac": [0, 1, 5], "allow": [0, 1, 2, 5], "one": [0, 1, 2], "suppli": 0, "both": [0, 2], "arrai": [0, 5], "function": [0, 1, 2, 3, 5], "pointer": [0, 1, 2, 3, 5], "last": [1, 2], "were": 1, "introduc": [1, 2], "being": 1, "tool": [1, 3, 5], "translat": [1, 3], "code": [1, 2, 3, 5], "write": [1, 2, 3, 5], "machin": [1, 3], "cpu": [1, 3, 5], "understand": [1, 3], "variou": [1, 3], "stage": 1, "get": [1, 3, 5], "gener": [1, 2, 3, 5], "feel": [1, 3], "how": [1, 2, 5], "read": [1, 2], "finish": 1, "talk": [1, 2, 3], "about": [1, 2, 3], "i": [1, 2, 3, 5], "e": [1, 2, 3], "diagnos": 1, "where": [1, 2, 5], "why": [1, 2], "our": [1, 2, 3, 5], "program": [1, 2, 5, 6], "fail": 1, "There": [1, 2, 3], "ar": [1, 2, 3, 5], "essenti": [1, 2], "three": [1, 2, 3, 5], "standard": [1, 2, 3, 5], "These": [1, 2, 3], "gcc": 1, "gnu": 1, "collect": 1, "default": 1, "most": [1, 2, 3, 5], "linux": [1, 3], "oper": [1, 2, 3, 5], "system": [1, 2, 5], "also": [1, 2, 3], "oldest": 1, "opaqu": [1, 5], "howev": [1, 2], "doe": [1, 2, 3], "highli": 1, "preform": [1, 3], "clang": 1, "pronounc": 1, "either": [1, 3], "word": [1, 2], "lang": 1, "llvm": 1, "base": [1, 2], "maco": 1, "though": [1, 2], "maintain": 1, "its": [1, 2, 5], "own": [1, 2], "branch": 1, "sit": [1, 5], "top": 1, "infrastrucutr": 1, "modern": [1, 2, 5], "reli": [1, 3, 5], "do": [1, 3], "optim": [1, 3], "necessari": [1, 5], "make": [1, 2, 3, 5], "fast": 1, "It": [1, 2], "realli": [1, 2], "remark": [1, 2], "project": [1, 2], "cl": 1, "ship": 1, "microsoft": 1, "visual": 1, "studio": 1, "refer": [1, 2, 5], "msvc": 1, "onli": [1, 2], "work": [1, 2, 3], "window": [1, 3], "tend": 1, "up": [1, 2, 5], "date": 1, "latest": 1, "iso": [1, 2], "which": [1, 2, 3, 5], "updat": 1, "everi": [1, 2], "year": [1, 2], "focu": [1, 5], "avail": 1, "can": [1, 2, 3, 5], "access": 1, "through": [1, 2], "subsystem": 1, "wsl2": 1, "those": [1, 2], "relecut": 1, "evolv": 1, "from": [1, 3, 5], "all": [1, 2, 3], "high": 1, "comput": [1, 2, 3], "happen": [1, 2], "cluster": [1, 5], "requir": [1, 2], "you": [1, 2, 3, 5], "familiar": [1, 5], "posix": [1, 5], "line": [1, 3, 5], "cli": 1, "veri": [1, 5], "worthwhil": 1, "learn": [1, 3], "now": [1, 2], "possibl": 1, "exampl": [1, 2], "us": [1, 2, 3, 5], "throughout": 1, "note": [1, 2, 5], "plenti": 1, "resourc": [1, 2], "explain": [1, 3], "instal": [1, 3], "simplic": 1, "instruct": [1, 3], "ubuntu": 1, "sudo": 1, "apt": 1, "To": [1, 2, 3, 5], "ensur": [1, 2], "your": [1, 2, 3], "run": [1, 3], "ask": 1, "print": [1, 2, 3], "what": [1, 2, 5, 6], "version": [1, 5], "go": [1, 2], "ahead": [1, 5], "creat": [1, 2], "folder": 1, "favorit": [1, 3], "spot": 1, "call": [1, 2, 3], "learning_scientific_comput": 1, "subfold": 1, "name": 1, "hello_world": 1, "execut": [1, 3, 5], "follow": [1, 2], "file": [1, 2, 3], "content": [1, 3], "cat": 1, "cpp": [1, 2, 3], "eof": 1, "iostream": [1, 3], "int": [1, 2, 3], "main": [1, 3], "std": [1, 2, 3, 5], "cout": [1, 3], "endl": [1, 3], "return": [1, 2, 3], "0": [1, 2, 3], "hello_word": 1, "o": 1, "sourc": [1, 3], "The": [1, 3, 5], "result": [1, 3], "output": [1, 2, 3], "should": [1, 2, 3], "just": [1, 2, 5], "let": [1, 2], "take": [1, 2, 3], "quick": 1, "digress": [1, 5], "under": [1, 2], "hood": [1, 2], "For": [1, 2], "process": 1, "begin": [1, 2], "must": [1, 2], "find": 1, "exactli": [1, 3], "across": 1, "input": 1, "put": 1, "togeth": 1, "preprocess": 1, "step": 1, "involv": 1, "pass": [1, 5], "replac": [1, 2], "direct": 1, "macro": 1, "ever": 1, "thei": [1, 2, 5], "occur": 1, "common": [1, 2, 5], "statement": 1, "past": [1, 3], "current": 1, "remov": 1, "ani": [1, 2, 3], "comment": 1, "dead": 1, "bit": [1, 2], "enclod": 1, "guard": 1, "evalu": [1, 2], "fals": [1, 2], "repres": [1, 2, 3, 5], "some": [1, 2, 5], "form": [1, 2], "easili": 1, "manipul": 1, "an": [1, 2, 3], "abstract": 1, "syntax": [1, 2, 5], "tree": 1, "analyz": 1, "see": [1, 2, 3], "bug": 1, "miss": 1, "semicolon": 1, "undeclar": 1, "variabl": [1, 3, 5, 6], "etc": [1, 2], "lex": 1, "pars": 1, "ast": 1, "convert": [1, 3], "binari": 1, "longer": [1, 2], "human": 1, "readibl": 1, "represent": 1, "transfer": 1, "languag": [1, 2, 3, 5], "intermedi": 1, "undergo": 1, "transform": 1, "more": [1, 2, 5], "effici": 1, "ha": [1, 2, 3, 5], "been": [1, 3], "A": [1, 2], "lot": [1, 5], "research": [1, 5], "gone": 1, "teach": [1, 5], "extrem": [1, 5], "good": [1, 2, 3], "assembl": [1, 3], "onc": 1, "happi": 1, "hard": 1, "architur": 1, "target": 1, "me": 1, "usual": [1, 5], "intel": 1, "chip": 1, "x86_64": 1, "could": [1, 2], "appl": 1, "silicon": 1, "arm": 1, "link": [1, 2, 3], "have": [1, 2, 3, 5], "cross": 1, "referenc": 1, "so": [1, 5], "symbol": [1, 2, 3], "resolv": [1, 3], "know": [1, 2, 3, 5], "look": [1, 2, 3], "when": [1, 2, 5], "stack": 1, "order": 1, "list": 1, "even": [1, 2], "further": [1, 3], "time": [1, 2, 5], "lto": 1, "reduc": 1, "size": [1, 2], "improv": [1, 2], "perform": 1, "made": 1, "awar": 1, "situat": 1, "librari": [1, 3, 5], "part": [1, 2, 5], "itself": 1, "intricaci": 1, "associ": 1, "each": [1, 3], "needn": 1, "t": [1, 2, 3], "review": [1, 5], "won": [1, 3], "abl": 1, "appreci": 1, "provid": [1, 2, 3, 5], "set": [1, 5], "vari": 1, "well": [1, 5], "equip": 1, "develop": [1, 2], "infrastructur": [1, 3], "without": [1, 2, 3], "clarifi": 1, "here": [1, 2, 3, 5], "plai": [1, 2], "describ": 1, "directli": [1, 2], "reason": [1, 2], "architectur": 1, "manufactur": 1, "back": 1, "two": [1, 2], "flavor": 1, "show": [1, 3], "personn": 1, "x86": 1, "comman": 1, "commonli": 1, "seen": 1, "abouot": 1, "evolut": 1, "encourag": 1, "re": 1, "curiou": 1, "physic": [1, 5], "locat": 1, "data": [1, 2, 5], "load": 1, "number": [1, 2, 5], "below": [1, 2], "ultim": [1, 2], "dictat": 1, "give": [1, 2, 5], "differ": [1, 2], "convent": 1, "start": [1, 2], "r": [1, 2], "prefix": 1, "indic": [1, 2], "whether": [1, 2], "64": [1, 2], "32": [1, 2], "16": [1, 2], "detail": [1, 2], "found": [1, 2], "rax": [1, 3], "accumul": 1, "registr": 1, "store": [1, 2], "valu": [1, 5, 6], "argument": [1, 2], "rbx": 1, "typic": [1, 2], "especi": [1, 2, 5], "rcx": 1, "count": [1, 2], "keep": [1, 2], "track": [1, 2], "loop": 1, "index": 1, "string": [1, 2, 3], "rdx": 1, "rsi": 1, "rdi": [1, 3], "destin": 1, "stream": 1, "text": 1, "termin": 1, "rbp": [1, 3], "point": 1, "bottom": 1, "first": [1, 2, 3, 5], "out": [1, 2, 3], "structur": [1, 5], "rsp": [1, 3], "r8": 1, "r15": 1, "addit": [1, 5], "xmm0": 1, "xm15": 1, "simd": 1, "vector": [1, 2, 5], "arithmet": 1, "st0": 1, "st7": 1, "float": [1, 2], "unit": [1, 3], "limit": 1, "determin": [1, 2], "If": [1, 2, 3], "yourself": [1, 5], "larg": [1, 2], "think": [1, 2], "restructur": 1, "like": [1, 3, 5], "mai": [1, 5], "notic": 1, "explor": [1, 3], "wa": 1, "complet": [1, 2], "__cxx_global_var_init": 1, "push": [1, 3], "mov": [1, 3], "movab": 1, "offset": [1, 3], "__ioinit": 1, "ios_bas": 1, "init": 1, "object": [1, 2, 5], "constructor": 1, "destructor": 1, "__dso_handl": 1, "__cxa_atexit": 1, "pop": [1, 3], "ret": [1, 3], "sub": 1, "dword": 1, "ptr": 1, "4": [1, 2], "l": 1, "str": 1, "basic_ostream": [1, 3], "char": [1, 2, 3], "char_trait": [1, 3], "const": [1, 3], "xor": 1, "eax": [1, 3], "add": [1, 3], "_global__sub_i_exampl": 1, "asciz": 1, "wolrd": [1, 3], "becaus": [1, 2, 5], "simpler": 1, "But": 1, "mention": [1, 2, 3, 5], "befor": [1, 2], "princip": 1, "tutori": 1, "modifi": [1, 2], "ad": 1, "semi": 1, "colon": 1, "lc0": [1, 3], "memori": [1, 2, 5], "esi": [1, 3], "second": [1, 5], "flat": [1, 3], "edi": [1, 3], "_zst4cout": [1, 3], "invok": 1, "insert": 1, "consum": 1, "_zst4endlicst11char_traitsiceerst13basic_ostreamit_t0_es6_": [1, 3], "next": [1, 2, 3], "insertt": 1, "destroi": 1, "problem": [1, 2], "crash": 1, "segment": 1, "fault": 1, "deviat": 1, "expect": [1, 2, 5], "behavior": [1, 2], "assist": 1, "narrow": 1, "down": [1, 3], "error": [1, 2, 5], "would": 1, "nice": 1, "other": [1, 2, 3, 5], "increment": [1, 2], "envis": 1, "intend": [1, 5], "basic": [1, 2, 5], "programm": 1, "gdb": 1, "usag": [1, 2], "adequ": 1, "purpos": [1, 3, 5], "come": [1, 2, 5], "lldb": 1, "between": [1, 2, 3], "offer": [1, 2], "backend": 1, "rabbit": 1, "whole": 1, "don": 1, "want": [1, 2], "c": [2, 3], "recip": 2, "ingredi": [2, 3], "sake": 2, "assum": 2, "cake": 2, "consist": 2, "continu": 2, "analog": 2, "specifi": [], "egg": 2, "flour": 2, "sugar": 2, "while": [2, 3], "much": 2, "central": 2, "contain": 2, "accept": 2, "correspond": 2, "true": 2, "class": [2, 5], "enumer": 2, "concept": 2, "subsequ": 2, "compil": [2, 3, 5, 6], "mean": [2, 3, 5], "written": [2, 3], "job": 3, "import": [3, 5], "behind": [2, 3], "scene": 3, "hardwar": [2, 3], "specif": 3, "mac": 3, "header": 3, "uint": 3, "bundl": 3, "linker": 3, "peopl": 3, "hpp": 3, "suffix": 3, "ones": 3, "sytstem": 3, "libc": 3, "via": 3, "packag": 3, "manag": [2, 3, 5], "libopenbla": 3, "match": 3, "type": [3, 5, 6], "devic": 3, "As": [2, 3, 5], "hello": 3, "world": 3, "sentenc": 3, "command": [3, 5], "known": [2, 3], "stdout": 3, "sure": 3, "enough": [2, 3, 5], "my": [3, 5], "websit": 3, "free": [2, 3], "copi": [2, 3, 5], "snippet": 3, "abov": [2, 3], "navig": [3, 5], "screenshot": [2, 3], "disassembl": 3, "hand": [2, 3], "side": [2, 3], "reproduc": [2, 3], "conveni": [2, 3], "valuabl": 3, "futur": [2, 3], "thumb": 3, "consider": [3, 5], "fewer": 3, "actual": [2, 3], "better": 3, "trick": [3, 5], "help": [2, 3, 5], "One": [2, 3], "notabl": 3, "instanc": 3, "clarif": 3, "lambda": [3, 5], "instead": 3, "executor": 3, "accomplish": 3, "click": 3, "new": [2, 3], "drop": 3, "menu": 3, "select": [2, 3], "option": [3, 5], "anoth": [2, 3], "third": [3, 5], "column": 3, "document": 5, "anyon": 5, "scientif": 5, "need": [2, 5], "guidanc": 5, "train": 5, "becom": 5, "bash": 5, "shell": 5, "script": 5, "intermdi": 5, "control": 5, "git": 5, "github": 5, "vast": 5, "major": 5, "dedic": 5, "end": 5, "demonstr": 5, "setup": 5, "complic": [2, 5], "disclaim": 5, "am": 5, "fan": 5, "inherit": [2, 5], "coverag": 5, "topic": [2, 5], "minim": 5, "stumbl": 5, "upon": 5, "idiom": 5, "curious": 5, "recur": 5, "templat": [5, 6], "paramet": [2, 5], "lastli": 5, "reflect": 5, "person": 5, "opinion": 5, "big": 5, "freedom": 5, "express": [2, 5], "emphasi": 5, "overview": 5, "primari": [2, 5], "construct": [2, 5], "2011": 5, "onward": 5, "fairli": 5, "decent": 5, "capabl": 5, "might": 5, "them": [2, 5], "hint": 5, "comprehens": 5, "full": 5, "milieu": 5, "salient": 5, "quit": 5, "enjoi": 5, "split": 5, "yoursefl": 5, "jargon": 5, "discuss": [2, 5], "design": 5, "dig": 5, "remot": [5, 6], "slurm": 5, "debug": [5, 6], "debugg": [5, 6], "anonym": 5, "overload": 5, "variad": 5, "user": 5, "smart": 5, "owndership": 5, "model": 5, "imper": 5, "vs": 5, "orient": 5, "move": 5, "assign": [2, 5], "best": 5, "friend": 5, "handl": 5, "stl": 5, "cover": 5, "metaprogam": 5, "algorithm": 5, "queue": 5, "sort": 5, "concurr": 5, "disribut": 5, "inspir": 5, "had": 5, "try": 5, "ellucid": 5, "numer": [5, 6], "integr": [5, 6], "linear": 5, "algebra": 5, "matrix": 5, "multipl": 5, "inner": 5, "product": 5, "reduct": 5, "multilinear": 5, "interpol": 5, "coupl": 5, "ordinari": 5, "differenti": 5, "equat": 5, "n": 5, "bodi": 5, "simul": [2, 5], "random": 5, "mani": [2, 5], "shape": 5, "graphic": 5, "card": 5, "mesag": 5, "massiv": 5, "parallel": 5, "independ": 5, "task": 5, "front": 5, "meant": 5, "environ": 5, "connect": [5, 6], "server": [5, 6], "softwar": 5, "final": 2, "semant": 2, "grammar": 2, "langaug": 2, "author": 2, "off": 2, "anolog": 2, "cannot": 2, "strongli": 2, "context": 2, "moreov": 2, "anywher": 2, "declar": [], "tyep": 2, "sometim": 2, "primit": 2, "simpl": 2, "arguabl": 2, "exist": 2, "summar": 2, "case": 2, "integ": 2, "keyword": 2, "sign": 2, "unsign": 2, "neg": 2, "non": 2, "respect": 2, "combin": 2, "produc": 2, "descript": 2, "void": 2, "b": 2, "long": 2, "d": [], "size_t": 2, "f": [], "doubl": 2, "g": 2, "bool": 2, "h": [], "incomplet": 2, "empti": 2, "short": 2, "wchar_t": 2, "char8_t": 2, "char16_t": 2, "char32_t": 2, "cpprefer": 2, "com": 2, "fundament": 2, "byte": 2, "occcupi": 2, "largest": 2, "20": 2, "http": [], "en": [], "w": [], "typdef": [], "typenam": 2, "struct": 2, "singl": 2, "ascii": 2, "charact": 2, "occupi": 2, "1": 2, "8": 2, "000": 2, "255": 2, "map": 2, "alphabet": 2, "basi": 2, "utf": 2, "encod": 2, "cccupi": 2, "annot": 2, "support": 2, "decim": 2, "storag": 2, "place": 2, "expens": 2, "zero": 2, "abbrevi": 2, "boolean": 2, "interrog": 2, "sizeof": 2, "godbolt": 2, "recal": 2, "precis": 2, "sound": 2, "postpon": 2, "later": 2, "subsect": [], "particularli": 2, "initi": 2, "alreadi": 2, "same": 2, "cpu_core_count": 2, "12": 2, "pi": 2, "1000": 2, "within": 2, "variable_nam": 2, "categori": 2, "nuanc": 2, "distinct": 2, "At": 2, "core": 2, "intrinis": 2, "satisfi": 2, "followin": 2, "lower": 2, "letter": 2, "underscor": 2, "z": 2, "_": 2, "valid": 2, "_fraction": 2, "flag_1": 2, "2_file": 2, "whitespac": 2, "abolish": 2, "foo": 2, "favor": 2, "brace": 2, "least": 2, "overhead": 2, "technic": 2, "term": 2, "instanti": 2, "rather": 2, "than": 2, "incur": 2, "unnecessari": 2, "distint": 2, "acquist": 2, "turn": 2, "given": 2, "throw": 2, "histor": 2, "appear": 2, "accord": 2, "whose": 2, "identifi": 2, "thing": 2, "consid": 2, "alreai": 2, "10": 2, "baz": 2, "caveat": 2, "ignor": 2, "recent": 2, "expand": 2, "prvalu": 2, "xvalu": 2, "glvalu": 2, "delin": 2, "role": 2, "interest": 2, "taxonomi": 2, "articl": 2, "extra": 2, "encount": 2, "less": 2, "extern": 2, "volatil": 2, "throught": 2, "imho": 2, "low": 2, "level": 2, "embed": 2, "usecas": 2, "insid": 2, "chaper": 2, "100": 2, "tell": 2, "visibl": 2, "outsid": 2, "hide": 2, "reman": 2, "address": 2, "encapsul": 2, "frequent": 2, "warn": 2, "equival": 2, "2": 2, "chang": 2, "after": 2, "stronger": 2, "durat": 2, "offload": 2, "certain": 2, "dramat": 2, "speed": 2, "000x": 2, "type_declar": 2, "shine": 2, "metaprogram": 2, "paradigm": 2, "wai": 2, "behav": 2, "far": 2, "complex": 2, "truli": 2, "distinguish": 2, "util": 2, "introduct": 2, "reserv": 2, "anyth": 2, "obei": 2, "deal": 2, "separ": 2, "boo": [], "particular": 2, "besid": 2, "presenc": 2, "angl": 2, "bracket": 2, "treat": 2, "green": 2, "box": 2, "type_specifi": 2, "template_nam": 2, "concret": 2, "type_decalar": 2, "concrete_typ": 2}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"numer": 0, "integr": 0, "compil": 1, "debug": 1, "debugg": 1, "c": [1, 5, 6], "dig": 1, "littl": 1, "deeper": 1, "disassembl": 1, "regist": 1, "type": [1, 2], "command": 1, "revisit": 1, "hello": 1, "world": 1, "valgrind": 1, "gbd": 1, "variabl": 2, "valu": 2, "templat": 2, "what": 3, "program": 3, "connect": 4, "remot": 4, "server": 4, "introduct": [5, 6], "chapter": 5, "content": 5, "lesson": 5, "exampl": [5, 6], "project": [5, 6], "essenti": 5, "high": [5, 6], "preform": [5, 6], "comput": [5, 6], "learn": 6, "scientif": 6, "A": 6, "guid": 6, "By": 6, "kevin": 6, "alex": 6, "ingl": 6, "basic": 6, "intrins": 2, "user": 2, "defin": 2, "declar": 2, "lvalu": 2, "rvalu": 2, "categor": 2, "deriv": 2, "from": 2, "l": 2, "rule": 2, "best": 2, "practic": 2, "name": 2, "delcar": 2, "qualifi": 2, "summari": 2, "The": 2, "static": 2, "specifi": 2, "const": 2, "constexpr": 2, "typedef": [], "instanti": [], "special": 2}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinxcontrib.bibtex": 9, "sphinx": 56}})