import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConfigInterceptor from "../../config/config.api"



export interface Region {
    id: number;
    nameAr: string;
    nameEn: string;
}

export interface City {
    id: number;
    nameAr: string;
    nameEn: string;
    regionId: number;
}

export interface District {
    id: number;
    nameAr: string;
    nameEn: string;
    cityId: number;
}

export interface Status {
    id: number;
    name: string;
    nameAr: string;
}

export interface ProjectType {
    id: number;
    name: string;
    nameAr: string;
}


export interface filterDataResponse {
    regions: Region[] | null;
    cities: City[] | null;
    districts: District[] | null;
    statuses: Status[] | null;
    projectTypes: ProjectType[] | null;
}

interface initialStateData {
    data: filterDataResponse | null,
    loading: boolean,
    error: string | null,
    cities: City[] | null,
    district: District[] | null,
}

const initialState: initialStateData = {
    data: null,
    loading: false,
    error: null,
    cities: null,
    district: null,
};


export const getCitiesByRegionId = createAsyncThunk("filter/cities", async (regionId: string, thunkApi) => {
    try {
        const response = await ApiConfigInterceptor.get(`/project/cities?regionId=${regionId}`);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
export const getDistrictsByCityId = createAsyncThunk("filter/districts", async (cityId: string, thunkApi) => {
    try {
        const response = await ApiConfigInterceptor.get(`/project/districts?cityId=${cityId}`);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const getFilterAPi = createAsyncThunk("filter/getFilter", async (filter: string, thunkApi) => {
    try {
        const response = await ApiConfigInterceptor.get(`/filters?type=${filter}`);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
            state.cities = null;
            state.district = null;

        },
        resetCitiesAndDistrict: (state) => {
            state.cities = null
            state.district = null
        },
    },
    extraReducers: (builder) => {

        // Get All Projects 
        builder.addCase(getFilterAPi.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getFilterAPi.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        }).addCase(getFilterAPi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
            // City 
            .addCase(getCitiesByRegionId.fulfilled, (state, action) => {
                state.cities = action.payload.data
            })
            // District
            .addCase(getDistrictsByCityId.fulfilled, (state, action) => {
                state.district = action.payload.data
            })

    }
})

export const { reset, resetCitiesAndDistrict } = FilterSlice.actions
export default FilterSlice.reducer
