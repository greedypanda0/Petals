import { Main } from "@/components/main";
import Search from "@/features/search/components/search";

export default function SearchPage() {
    return (
        <Main headbar={false}>
            <Search />
        </Main>
    );
}