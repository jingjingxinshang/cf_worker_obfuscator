<template>
  <div class="container">
    <h2>JS代码混淆工具</h2>
    
    <div class="input-section">
      <div class="file-input">
        <input 
          type="file" 
          accept=".js"
          @change="handleFileInput" 
          ref="fileInput"
          style="display: none"
        >
        <button @click="$refs.fileInput.click()" class="file-btn">
          选择文件
        </button>
        <span v-if="selectedFileName" class="file-name">
          已选择: {{ selectedFileName }}
        </span>
      </div>

      <div class="form-group">
        <textarea
          v-model="sourceCode"
          placeholder="请输入需要混淆的JS代码或选择文件"
          rows="10"
          class="input-area"
        ></textarea>
      </div>
    </div>

    <div class="options">
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="options.compact">
          Compact
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="options.ignoreImports">
          Ignore Imports
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="checkbox" v-model="options.unicodeEscapeSequence">
          Unicode Escape Sequence
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="text" v-model="options.identifiersPrefix">
          Identifiers Prefix
        </label>
      </div>
      <div class="option-item">
        <label>
          <input type="text" v-model="outputFileName" placeholder="输出文件名">
          输出文件名
        </label>
      </div>

      <div class="option-group">
        <h4>代码转换选项</h4>
        <div class="option-item">
          <label>
            <input type="checkbox" v-model="options.controlFlowFlattening">
            控制流扁平化
          </label>
          <div class="sub-option" v-if="options.controlFlowFlattening">
            <label>
              扁平化概率:
              <input 
                type="number" 
                v-model.number="options.controlFlowFlatteningThreshold"
                min="0"
                max="1"
                step="0.1"
              >
            </label>
          </div>
        </div>
        
        <div class="option-item">
          <label>
            <input type="checkbox" v-model="options.deadCodeInjection">
            注入死代码
          </label>
          <div class="sub-option" v-if="options.deadCodeInjection">
            <label>
              注入概率:
              <input 
                type="number" 
                v-model.number="options.deadCodeInjectionThreshold"
                min="0"
                max="1"
                step="0.1"
              >
            </label>
          </div>
        </div>
      </div>

      <div class="option-group">
        <h4>字符串转换选项</h4>
        <div class="option-item">
          <label>
            <input type="checkbox" v-model="options.stringArray">
            启用字符串数组
          </label>
        </div>
        <div class="option-item" v-if="options.stringArray">
          <label>
            <input type="checkbox" v-model="options.stringArrayCallsTransform">
            转换字符串数组调用
          </label>
        </div>
        <div class="option-item" v-if="options.stringArray">
          <label>
            <input type="checkbox" v-model="options.stringArrayRotate">
            轮转字符串数组
          </label>
        </div>
        <div class="option-item" v-if="options.stringArray">
          <label>
            <input type="checkbox" v-model="options.stringArrayShuffle">
            打乱字符串数组
          </label>
        </div>
        <div class="option-item" v-if="options.stringArray">
          <label>
            字符串数组阈值:
            <input 
              type="number" 
              v-model.number="options.stringArrayThreshold"
              min="0"
              max="1"
              step="0.1"
            >
          </label>
        </div>
      </div>

      <div class="option-group">
        <h4>代码保护选项</h4>
        <div class="option-item">
          <label>
            <input type="checkbox" v-model="options.selfDefending">
            启用自我保护
          </label>
        </div>
        <div class="option-item">
          <label>
            <input type="checkbox" v-model="options.splitStrings">
            拆分字符串
          </label>
          <div class="sub-option" v-if="options.splitStrings">
            <label>
              拆分长度:
              <input 
                type="number" 
                v-model.number="options.splitStringsChunkLength"
                min="1"
              >
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button @click="obfuscateCode" class="obfuscate-btn">混淆代码</button>
      <button 
        @click="downloadFile" 
        class="download-btn"
        :disabled="!obfuscatedCode"
      >
        下载文件
      </button>
    </div>

    <div class="form-group" v-if="obfuscatedCode">
      <div class="output-header">
        <h3>混淆后的代码：</h3>
        <button @click="copyToClipboard" class="copy-btn">
          {{ copyButtonText }}
        </button>
      </div>
      <textarea
        v-model="obfuscatedCode"
        readonly
        rows="10"
        class="output-area"
      ></textarea>
    </div>

    <footer class="footer">
      <p>
        © 2024 JS代码混淆工具 | 
        <a 
          href="https://github.com/yourusername/js-obfuscator-tool/blob/main/LICENSE" 
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT License
        </a>
      </p>
    </footer>
  </div>
</template>

<script>
import JavaScriptObfuscator from 'javascript-obfuscator';

export default {
  name: 'ObfuscatorForm',
  data() {
    return {
      sourceCode: '',
      obfuscatedCode: '',
      outputFileName: 'obfuscated.js',
      selectedFileName: '',
      copyButtonText: '复制代码',
      options: {
        compact: true,
        ignoreImports: true,
        unicodeEscapeSequence: true,
        identifierNamesGenerator: 'hexadecimal',
        identifiersPrefix: 'a0_0x',
        target: 'service-worker',
        renameGlobals: true,
        
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.8,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.5,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 1,
        stringArrayCallsTransform: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        
        splitStrings: true,
        splitStringsChunkLength: 3,
        numbersToExpressions: true,
        
        selfDefending: true,
      }
    }
  },
  methods: {
    handleFileInput(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      this.selectedFileName = file.name;
      // 如果没有设置输出文件名，使用原文件名加上后缀
      if (this.outputFileName === 'obfuscated.js') {
        const baseName = file.name.replace('.js', '');
        this.outputFileName = `${baseName}_obfuscated.js`;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.sourceCode = e.target.result;
      };
      reader.readAsText(file);
    },

    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.obfuscatedCode);
        this.copyButtonText = '已复制！';
        setTimeout(() => {
          this.copyButtonText = '复制代码';
        }, 2000);
      } catch (err) {
        alert('复制失败，请手动复制');
      }
    },

    obfuscateCode() {
      try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(
          this.sourceCode,
          this.options
        );
        this.obfuscatedCode = obfuscationResult.getObfuscatedCode();
      } catch (error) {
        alert('混淆过程中发生错误：' + error.message);
      }
    },

    downloadFile() {
      if (!this.obfuscatedCode) {
        alert('请先生成混淆代码');
        return;
      }

      const blob = new Blob([this.obfuscatedCode], { type: 'text/javascript' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      
      const fileName = this.outputFileName.endsWith('.js') 
        ? this.outputFileName 
        : `${this.outputFileName}.js`;
      downloadLink.download = fileName;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      URL.revokeObjectURL(downloadLink.href);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.input-section {
  margin-bottom: 20px;
}

.file-input {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-name {
  color: #666;
  font-size: 0.9em;
}

.form-group {
  margin-bottom: 20px;
}

.input-area, .output-area {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
}

.options {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.option-item {
  margin: 10px 0;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.obfuscate-btn, .download-btn, .file-btn, .copy-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.obfuscate-btn {
  background-color: #4CAF50;
}

.download-btn {
  background-color: #2196F3;
}

.file-btn {
  background-color: #607D8B;
}

.copy-btn {
  background-color: #FF9800;
  padding: 5px 15px;
}

.obfuscate-btn:hover {
  background-color: #45a049;
}

.download-btn:hover {
  background-color: #1976D2;
}

.file-btn:hover {
  background-color: #546E7A;
}

.copy-btn:hover {
  background-color: #F57C00;
}

.download-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

input[type="text"] {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 5px;
}

h3 {
  margin: 0;
}

.footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
  font-size: 0.9em;
}

.footer a {
  color: #2196F3;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.option-group {
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.option-group h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.sub-option {
  margin-left: 20px;
  margin-top: 5px;
}

.sub-option input[type="number"] {
  width: 60px;
  padding: 3px;
  margin-left: 5px;
}

select {
  margin-left: 10px;
  padding: 3px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

select[multiple] {
  height: auto;
  min-height: 80px;
}

.help-text {
  display: block;
  margin-top: 5px;
  color: #666;
  font-size: 0.8em;
}
</style> 