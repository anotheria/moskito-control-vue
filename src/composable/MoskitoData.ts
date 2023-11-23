import MoskitoService from '@/services/MoskitoService.ts';

export default function useMoskitoData() {
  async function fetchViews() {
    const response = await MoskitoService.fetchViews();
    console.log(response);
  }
  return {
    fetchViews,
  };
}
