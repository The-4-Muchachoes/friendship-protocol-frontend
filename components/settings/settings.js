// copied from tutorial

export default () => {
  const isLocalhost =
    window.location.host.indexOf('127.0.0.1') != -1 ||
    window.location.host.indexOf('localhost') != -1;

  const localApiUrl = 'http://localhost:8080';
  const prodApiUrl = 's';

  window.apiUrl = isLocalhost ? localApiUrl : prodApiUrl;
};