import cfRedIcon from './cf-red-favicon.png';

const link = document.createElement('link');
link.setAttribute('rel', 'icon');
link.setAttribute('type', 'image/png');
link.setAttribute('href', cfRedIcon);
document.head.appendChild(link);