"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/stores/useUser";

export default function SessionSync() {
  useEffect(() => {
    const supabase = createClient();
    const setUser = useUser.getState().setUser;

    const hydrateSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    hydrateSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
